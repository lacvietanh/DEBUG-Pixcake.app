#!/bin/bash
# KẾT LUẬN: FILE 21 BỊ LỖI ( chunk-common.cba5bf27.js )
# Từ file 21 đến 22 bị lỗi. (log không báo cho đến file 23. - ở giữa là khu nhiều exports)
# => Việc thay thế nên loại trừ ra, không được thay thế trong khai báo exports JSON.

cd `dirname "$0"`
RED=$'\e[1;31m'; NC=$'\e[0m'
declare mode,m
JsDir="source/PixCake.app/Contents/Resources/www/js"
langFile="source/lang.csv"
IFS=$'\n' read -d '' -r -a LANG < $langFile

menu(){
    clear
    echo -e "$(basename $0) -m [menu]"
    echo "MENU:"
    echo "  es. ${RED}E${NC}dit This ${RED}s${NC}cript"
    echo "  el. ${RED}E${NC}dit ${RED}l${NC}ang.csv"
    echo "  uz. ${RED}Unzip${NC} Original JS "
    echo "   r. ${RED}RUN${NC} VN PATCH "
    echo "  _______After Updated PixCake.app________"
    echo "  ca: ${RED}C${NC}opy ${RED}A${NC}pp to source (rename)"
    echo "   b: ${RED}B${NC}eautify JS file in app"
    echo "  up: ${RED}UnPack${NC} all js/*.${RED}map${NC}to AkiUnpack"
    echo "  bz: ${RED}Backup ${NC} Original JS (to ${RED}Zip${NC})"
    echo "  _______After Updated PixCake.app________"
    echo "  ex: ${RED}Export${NC} app to ZIP (PixCake.app)"
    echo "   e: Exit"
}
ask(){
    if [ -z $m ]; then menu; read -p "You select: " m; fi
    case $m in
        es) vim $0               ;;
        el) vim source/lang.csv  ;;
        uz) UnzipOriginalJS      ;;
        r)  vnPatch              ;;
        ca) CopyAppToSource      ;;
        b)  BeautifyJS           ;;
        up) UnPackByMap          ;;
        bz) BackupOriJS_tozip    ;;
        ex) ExportAppToZip       ;;
        e) exit 0                ;;
        *) echo "Invalid option"; unset m; sleep 1; ask
    esac
    # unset m;ask #LOOP
}
UnzipOriginalJS(){
    unzip -o source/JS-ori*.zip -d ${JsDir}/
    echo "Đã xả backup JS gốc vào ${RED}$JsDir${NC}"
    unset m; sleep 1; ask
}
CopyAppToSource(){
    echo "Đang copy..."
    rsync -havIr /Applications/像素蛋糕.app/. source/PixCake.app
    echo "Copy xong!"
}
BeautifyJS(){
    [ js-beautify ] || echo "chưa cài đặt js-beautify! ${RED}npm -g install js-beautify${NC}"
    local i js ; i=1
    for js in $JsDir/*.js; do
        echo "===== Beautify File ${RED}$i: $(basename $js) ${NC} ====="
        js-beautify --indent-size 2 $js -o $js
        ((i=i+1))
    done
}
UnPackByMap(){
    # https://github.com/rarecoil/unwebpack-sourcemap
    echo "function chưa viết"
}
BackupOriJS_tozip(){
    echo "function chưa viết"
}
ExportAppToZip(){
    echo "function chưa viết"
}
vnPatch(){
    local i zh vn line js
    for js in $JsDir/*.js; do
        i=1; echo "===== file $i: $js ====="
        for line in "${LANG[@]}"; do
            [ $i -lt 5 ] && break
            zh="$(echo $line|cut -d ';' -f 1 |xargs)"
            vn="$(echo $line|cut -d ';' -f 2 |xargs|rev|cut -c2-|rev)"
            count=$(cat $js | grep -c "$zh")
            if [ $count -gt 0 ]; then
                echo -e " Tìm thấy: zh=$zh\tvn=$vn"
                sed -i "" -e "s|${zh}|${vn}|" $js #OK
                echo "DEBUG: grep zh js: $(grep "$zh" $js)"
            fi
            [ $i -gt 26 ] && break
        done
        ((i=i+1))
    done
}

##################  run   ########################
pwd
while getopts m: args
do
    case "${args}" in
        m) mode=${OPTARG}      ;;
    esac
done
[ -z "$mode" ] && ask

# js-beautify $js -o $js
#Pixel Cake:
# v4516195586
# 75845272
