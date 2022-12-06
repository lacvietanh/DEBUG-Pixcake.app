#!/bin/bash
cd `dirname "$0"`
# JsDir="../pixcake.app/Contents/Resources/www/js"
JsDir=/Applications/像素蛋糕.app/Contents/Resources/www/js
langFile="lang.csv"
IFS=$'\n' read -d '' -r -a LANG < $langFile
i=1
for js in $JsDir/*.js; do
    echo "===== file $i: $js ====="
    for line in "${LANG[@]}"; do
        [ $i -lt 5 ] && break
        zh="$(echo $line|cut -d ';' -f 1 |xargs)"
        vn="$(echo $line|cut -d ';' -f 2 |xargs|rev|cut -c2-|rev)"
        count=$(cat $js | grep -c "$zh")
        if [ $count -gt 0 ]; then
            echo -e " Tìm thấy: zh=$zh\tvn=$vn"
            sed -i "" -e "s|${zh}|${vn}|" $js #OK
            # echo "Vui lòng kiểm tra nè.... "
            # code -r $js
        fi
        # [ $i -gt 5 ] && exit 0
    done
    ((i=i+1))
done
# cat $1 | grep -Po '[\p{Han}]{1,1024}' > $_FILE_
# js-beautify $js -o $js
#Pixel Cake: 
# v4516195586
# 75845272
