# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys


sys.stdout.reconfigure(encoding='utf-8')

def checarEscritorios(grupos):
    
    gruposArray = grupos.split(",")
    
    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    # print("Inst: "+instituicoes)
    # print("Ca: "+categorias)

    
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    
    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    
    df2 = df[df['INSTITUIÇÃO']==instituicoes]

    df2 = df2[df2['CATEGORIAS']==categorias]



    df3 = df2.iloc[:, 0]

    onlyClientes = []
    for item in df3:
        onlyClientes.append(item)

    #onlyClientes.append('Todos')
    return onlyClientes

def buscarDados(grupos, escritorio):
    gruposArray = grupos.split(",")
    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    
    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    
    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], dayfirst=True)
    df['DATA PREVISTA'] = df['DATA PREVISTA'].dt.strftime('%d/%m/%Y')
    
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'])
    df['DATA RESULTADO'] = df['DATA RESULTADO'].dt.strftime('%m/%Y')

    df['MÊS/ANO'] = pd.to_datetime(df['MÊS/ANO'])
    df['MÊS/ANO'] = df['MÊS/ANO'].dt.strftime('%m/%Y')

    
    df2 = df[df['INSTITUIÇÃO']==instituicoes]

    df2 = df2[df2['CATEGORIAS']==categorias]

    df2 = df2[df2['CLIENTE']==escritorio]

    df2 = df2.replace(np.nan, '', regex=True)


    # onlyClientes = []
    # for item in df3:
    #     onlyClientes.append(item)

    #onlyClientes.append('Todos')
    list1 = df2.to_json(orient="values", force_ascii=False)
    print(list1)
    return list1

def salvarRow(grupos, nomeCategoria, dataPrevista, dataResultado, responsaveis, submissao, status, escritorios, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao):
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    df = df.fillna("")

    gruposArray = grupos.split(",")
    arrayEscritorios = escritorios.split(",")


    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    
    filepath2 = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f2 = open(filepath2, "r")
    w2 = f2.read()

    
    dfCut = pd.read_excel(w2, sheet_name="CATEGORIAS PARA LIPE")
    dfCut = dfCut.fillna("")

    format_str = '%d/%m/%Y'
    format_str2 = '%m/%Y'
    aDataPrevista = datetime.strptime(dataPrevista, format_str) if dataPrevista != "" else ""
    aDataResultado = datetime.strptime(dataResultado, format_str2) if dataResultado != "" else ""

    
    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], dayfirst=True)
    df['DATA PREVISTA'] = df['DATA PREVISTA'].dt.strftime('%d/%m/%Y')
    
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'])
    df['DATA RESULTADO'] = df['DATA RESULTADO'].dt.strftime('%m/%Y')

    df['MÊS/ANO'] = pd.to_datetime(df['MÊS/ANO'])
    df['MÊS/ANO'] = df['MÊS/ANO'].dt.strftime('%m/%Y')

    for item in arrayEscritorios:
        df3= pd.DataFrame([
            (item,
            instituicoes,
            nomeCategoria,
            aDataPrevista.strftime(format_str) if dataPrevista!="" else "",
                #dataPrevista if dataPrevista!="" else "",
            aDataPrevista.strftime('%m/%Y') if dataPrevista!="" else "",
            aDataResultado.strftime(format_str2) if dataResultado!="" else "",
            responsaveis,
            submissao,
            status,
            casosAndamento,
            casosRevisao,
            casosTranscricao,
            casosAprovacao)], columns=("CLIENTE","INSTITUIÇÃO","CATEGORIAS","DATA PREVISTA","MÊS/ANO","DATA RESULTADO","RESPONSÁVEL","FAZ SUBMISSÃO? (S/N)","STATUS","CASOS EM ANDAMENTO", "CASOS EM REVISÃO","CASOS EM TRANSCRIÇÃO","CASOS EM APROVAÇÃO"))

        df = df.append(df3, ignore_index=True)

    for item in arrayEscritorios:
        dfCut2 = dfCut[dfCut['INSTITUIÇÃO']==instituicoes]

        dfCut2 = dfCut2[dfCut2['CATEGORIAS']==categorias]

        dfCut2 = dfCut2[dfCut2['CLIENTE']==item]


        
        index = int(dfCut2.index[0])
        df = df.drop(index)

    excelBook = openpy.load_workbook(w)
    print(df)
    with pd.ExcelWriter(w, engine='openpyxl') as writer:
        # Save your file workbook as base
        writer.book = excelBook
        writer.sheets = dict((ws.title, ws) for ws in excelBook.worksheets)

        # Now here add your new sheets
        df.to_excel(writer,'CATEGORIAS PARA LIPE', index = False)

        # Save the file
        writer.save()
    print(df)
    return df

def adicionarEscritorio(escritorio, grupos, responsavel, submissao, status, dataPrevista, dataResultado, casosAndamento, casosRevisao, casosTranscricao, casosAprovacao):
    filepath = os.path.join('./UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    df = df.fillna("")
    
    gruposArray = grupos.split(",")

    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    mesAno = dataPrevista[3:]

    if escritorio!='':
        df3 = pd.DataFrame([
            (escritorio,
            instituicoes,
            categorias,
            dataPrevista,
            mesAno,
            dataResultado,
            responsavel,
            submissao,
            status,
            casosAndamento,
            casosRevisao,
            casosTranscricao,
            casosAprovacao)], columns=("CLIENTE","INSTITUIÇÃO","CATEGORIAS","DATA PREVISTA","MÊS/ANO","DATA RESULTADO","RESPONSÁVEL","FAZ SUBMISSÃO? (S/N)","STATUS","CASOS EM ANDAMENTO", "CASOS EM REVISÃO","CASOS EM TRANSCRIÇÃO","CASOS EM APROVAÇÃO"))

        df = df.append(df3, ignore_index=True)
        print("feito todos")

    else:
        pass


    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], dayfirst=True)
    df['DATA PREVISTA'] = df['DATA PREVISTA'].dt.strftime('%d/%m/%Y')
    
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'])
    df['DATA RESULTADO'] = df['DATA RESULTADO'].dt.strftime('%m/%Y')

    df['MÊS/ANO'] = pd.to_datetime(df['MÊS/ANO'])
    df['MÊS/ANO'] = df['MÊS/ANO'].dt.strftime('%m/%Y')
    
    excelBook = openpy.load_workbook(w)
    with pd.ExcelWriter(w, engine='openpyxl', date_format='DD/MM/YYYY') as writer:
        # Save your file workbook as base
        writer.book = excelBook
        writer.sheets = dict((ws.title, ws) for ws in excelBook.worksheets)

        # Now here add your new sheets
        df.to_excel(writer,'CATEGORIAS PARA LIPE', index = False)

        # Save the file
        writer.save()

if sys.argv[1]=="checar-escritorios":
    print(checarEscritorios(sys.argv[2]))
elif sys.argv[1]=="salvar-dados":
    print(salvarRow(sys.argv[2], sys.argv[3],sys.argv[4], sys.argv[5],sys.argv[6], sys.argv[7],sys.argv[8], sys.argv[9], sys.argv[10], sys.argv[11], sys.argv[12], sys.argv[13]))
elif sys.argv[1]=="adicionar-escritorio":
    print(adicionarEscritorio(sys.argv[2], sys.argv[3],sys.argv[4], sys.argv[5],sys.argv[6], sys.argv[7],sys.argv[8], sys.argv[9], sys.argv[10], sys.argv[11], sys.argv[12]))
else:
    print(buscarDados(sys.argv[2], sys.argv[3]))


sys.stdout.flush()