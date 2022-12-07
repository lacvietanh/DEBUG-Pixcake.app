#!/bin/bash
# KẾT LUẬN: FILE 21 BỊ LỖI ( chunk-common.cba5bf27.js )
# Từ file 21 đến 22 bị lỗi. (log không báo cho đến file 23. - ở giữa là khu nhiều exports)
# => Việc thay thế nên loại trừ ra, không được thay thế trong khai báo exports JSON.
RED=$'\e[1;31m'; NC=$'\e[0m'
cd `dirname "$0"`
# JsDir="../pixcake.app/Contents/Resources/www/js"
JsDir=/Applications/像素蛋糕.app/Contents/Resources/www/js
langFile="lang.csv"
IFS=$'\n' read -d '' -r -a LANG < $langFile
i=1
for js in $JsDir/*.js; do
    echo "===== file $i: $js ====="
    # cat $js |nl|grep '" "'
    # cat $(dirname $js)/_Bak/$(basename $js)|nl|grep '" "'
    for line in "${LANG[@]}"; do
        [ $i -lt 23 ] && break
        zh="$(echo $line|cut -d ';' -f 1 |xargs)"
        vn="$(echo $line|cut -d ';' -f 2 |xargs|rev|cut -c2-|rev)"
        count=$(cat $js | grep -c "$zh")
        if [ $count -gt 0 ]; then
            echo -e " Tìm thấy: zh=$zh\tvn=$vn"
            sed -i "" -e "s|${zh}|${vn}|" $js #OK
            echo "DEBUG: grep zh js: $(grep "$zh" $js)"
            # cat $js |nl| grep '"："'
            # echo "Vui lòng kiểm tra nè.... "
            # code -r $js
        fi
        [ $i -gt 25 ] && break
    done
    ((i=i+1))
done

# js-beautify $js -o $js
#Pixel Cake:
# v4516195586
# 75845272
