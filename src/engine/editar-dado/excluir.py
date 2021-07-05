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

    
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

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

def excluirDado(grupos, escritorio):
    gruposArray = grupos.split(",")

    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    print(escritorio)
    print(grupos)

    
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    
    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    df = df[df['INSTITUIÇÃO']==instituicoes]

    df = df[df['CATEGORIAS']==categorias]

    df = df[df['CLIENTE']==escritorio]


    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'])
    df['DATA PREVISTA'] = df['DATA PREVISTA'].dt.strftime('%d/%m/%Y')
    
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'])
    df['DATA RESULTADO'] = df['DATA RESULTADO'].dt.strftime('%m/%Y')

    df['MÊS/ANO'] = pd.to_datetime(df['MÊS/ANO'])
    df['MÊS/ANO'] = df['MÊS/ANO'].dt.strftime('%m/%Y')

    
    
    index = int(df.index[0])

    # write2excel(w,'CATEGORIAS PARA LIPE', df2)
    # return "opa"
    index = index+2

    book= openpy.load_workbook(w)
    sheet = book['CATEGORIAS PARA LIPE']
    #delete row
    print(str(index))
    sheet.delete_rows(index)
    book.save(w)
    
    return str(index)

def excluirVariosDado(grupos, escritorio):
    gruposArray = grupos.split(",")
    arrayEscritorios = escritorio.split(",")

    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    print(arrayEscritorios)
    print(grupos)

    
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    
    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    book= openpy.load_workbook(w)
    sheet = book['CATEGORIAS PARA LIPE']

    for item in arrayEscritorios:
        df = df[df['INSTITUIÇÃO']==instituicoes]

        df = df[df['CATEGORIAS']==categorias]

        df = df[df['CLIENTE']==item]
    
        index = int(df.index[0])

        index = index+2
    
        #delete row
        print(str(index))
        sheet.delete_rows(index)
        
    book.save(w)
    
    return "feitos"


if sys.argv[1]=="excluir-apenas":
    print(excluirDado(sys.argv[2], sys.argv[3]))
else:
    print(excluirVariosDado(sys.argv[2], sys.argv[3]))


sys.stdout.flush()