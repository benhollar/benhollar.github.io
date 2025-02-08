#!/bin/bash

Help() {
    echo "Add an image to the website content, automatically compressing it."
    echo
    echo "Syntax: add_image [-o|n|h] <PATH_TO_IMAGE>"
    echo "<PATH_TO_IMAGE>    The full or relative path to the image file to copy."
    echo "              o    The subfolder of the content directory to put the image in."
    echo "              n    The filename of the copied output image."
    echo "              h    Print this help."
}

output_directory=""
filename=""
while getopts ":ho:n:" option; do
   case $option in
      h) # display Help
         Help
         exit;;
      o) # Set the output directory
         output_directory=$OPTARG;;
      n) # Set the output filename
         filename=$OPTARG;;
     \?) # Invalid option
         echo "Error: Invalid option"
         exit;;
   esac
done

if [[ $# -eq 0 ]]; then
    Help
    exit
fi;

image_path=${@:$OPTIND:1}
if [[ -z $filename ]]; then
   filename=$(basename -- "$image_path")
fi
filename_no_ext="${filename%.*}"
output_directory="src/content/images/$output_directory"
output_path="$output_directory/$filename"
output_path_md="$output_directory/$filename_no_ext.md"

# Copy the image, then compress it
mkdir -p $output_directory
cp $image_path $output_path
#  Limit the maximum size and apply a gentle compression quality
mogrify -quality 75 -resize 1600x900 $output_path

# Image Metadata
#  Get the date the photo was taken: https://stackoverflow.com/a/32074044
DATEBITS=( $(exiftool -CreateDate -FileModifyDate -DateTimeOriginal $output_path | awk -F: '{ print $2 ":" $3 ":" $4 ":" $5 ":" $6 }' | sed 's/+[0-9]*//' | sort | grep -v 1970: | cut -d: -f1-6 | tr ':' ' ' | head -1) )
YEAR=${DATEBITS[0]}
MONTH=${DATEBITS[1]}
DAY=${DATEBITS[2]}
#  Write the associated markdown for the content collection
rm -f $output_path_md
echo "---" >> $output_path_md
echo "url: ./$filename" >> $output_path_md
echo "date: $YEAR-$MONTH-$DAY" >> $output_path_md
echo "alt:" >> $output_path_md
echo "tags:" >> $output_path_md
echo "-" >> $output_path_md
echo "hideGallery: false" >> $output_path_md
echo "---" >> $output_path_md
