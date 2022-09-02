import json
from collections import OrderedDict
import xlrd
import datetime
import pprint
import requests
import sys
import unicodedata
import copy
import codecs
# import urllib.request

# 読み込みモードでオープン
file = open('./○○.txt', 'r', encoding="utf-8_sig")
# readlinesでリストとして読み込む
fileList = file.readlines()

exportJson = {}
questionNo = 0
questionDetailJson = {}
questionDetail = ''
answerNo = 0
answerList = []
isAnswerArea = False
isQuestionTitle = False

## 機種依存文字変換
def convertKishuizon(izonMoji):
    convertMoji = 0
    if izonMoji == '①':
        convertMoji = 1
    elif izonMoji == '②':
        convertMoji = 2
    elif izonMoji == '③':
        convertMoji = 3
    elif izonMoji == '④':
        convertMoji = 4
    elif izonMoji == '⑤':
        convertMoji = 5
    elif izonMoji == '⑥':
        convertMoji = 6
    elif izonMoji == '⑦':
        convertMoji = 7
    elif izonMoji == '⑧':
        convertMoji = 8
    elif izonMoji == '⑨':
        convertMoji = 9
    else:
        convertMoji = 0

    return convertMoji

# メインの変換処理
for fileItem in fileList :

    # 空行は無視
    if fileItem.strip() == '':
       continue

    # 答えを検索

    splitAnswerItem = "".join(fileItem.split())
    if splitAnswerItem.find('正答') == 1:
        izonArg = splitAnswerItem[4:5].split()
        answerNo = convertKishuizon(izonArg[0])
        splitAnswerItem = ''
        isAnswerArea = False
        continue

    # 問題の終わりを検索
    if splitAnswerItem.find('参照') == 1:
        questionDetailJson['questionNo'] = questionNo
        questionDetailJson['questionDetail'] = questionDetail.replace(
            '＜解答群＞', '')
        questionDetailJson['answerList'] = copy.deepcopy(answerList)
        questionDetailJson['answerNo'] = str(answerNo)
        # print(answerList)
        # 答えが拾えない場合は追加しない（複数の答えに対応できていない）
        if answerNo > 0 :
            exportJson[questionNo] = copy.deepcopy(questionDetailJson)
        questionNo = 0
        questionDetail = ''
        answerNo = 0
        answerList = []
        questionDetailJson = {}

    # 問を検索
    # print(fileItem.find('問'))
    if fileItem.find('問') == 0:
        no = fileItem[1:3]
        convNo = unicodedata.normalize('NFKC', no.strip())

        # 問題内容の結合
        questionDetail = fileItem.replace(fileItem[0:3], '').replace('\n','')
        # 問番号の確認
        if not convNo.isnumeric():
            continue
        questionNo = convNo
        # 問題タイトルエリア
        isQuestionTitle = True
        # このあとは回答エリア
        isAnswerArea = True
        # exportJsonList.append(['"questionNo":' + no + ','])
        # exportJsonList.append(['"questionDetail":"'])
        continue

    # 文最初の番号があった場合に数値に変換
    splitAnswerAreaItem = "".join(fileItem.split())
    answerArg = splitAnswerAreaItem[0:1].split()
    selectAnswerNo = convertKishuizon(answerArg[0])
    # 問中に改行されていた場合対応
    if isQuestionTitle and selectAnswerNo == 0:
        # 問題内容の追加
        questionDetail += fileItem.replace('\n', '')

    # 回答群フィールド
    if selectAnswerNo > 0 and isAnswerArea:
    #     isAnswerArea = True
    #     continue
    # if isAnswerArea :
        answerString = splitAnswerAreaItem.replace(answerArg[0], '')
        answerJson = {
            'no': str(selectAnswerNo),
            'answer': answerString
            }
        answerList.append(answerJson)
        selectAnswerNo = 0
        # 解答群でも改行が入ってる可能性がある対応
        isQuestionTitle = False
        continue

    # 必要ないフィールドはスキップ
    if splitAnswerAreaItem.find('問のテーマ') == 1 or splitAnswerAreaItem.find('属性') == 1 or splitAnswerAreaItem.find('難易度') == 1 or splitAnswerAreaItem.find('コメント') == 1 :
        continue

    # 解答群フィールド２
    if isAnswerArea and not isQuestionTitle :
        answerJson['answer'] += splitAnswerAreaItem
    # elif isAnswerArea and selectAnswerNo == 0 :
    #     # まだ問題内容のため追加
    #     questionDetail += fileItem.replace('\n', '')
    # 問題内容フィールド
    # questionDetail += "".join(fileItem.split())
    # print(fileItem)

# print(exportJson)

# Pythonオブジェクトをファイル書き込み
savepath = 'sample.json'
with codecs.open(savepath, 'w', 'utf-8') as outfile:
    json.dump(exportJson, outfile, ensure_ascii=False)

# Pythonオブジェクトを文字列に変換
# json_str = json.dumps(data)
# print(json_str)

