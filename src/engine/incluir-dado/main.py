# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys


sys.stdout.reconfigure(encoding='utf-8')

escritorios = sys.argv[1]
instituicao = sys.argv[2]
responsavel = sys.argv[3]
categoria = sys.argv[4]
submissao = sys.argv[5]
status = sys.argv[6]
dataPrevista = sys.argv[7]
dataResultado = sys.argv[8]


def buscarInstituicoes(escritorios, instituicao, responsavel, categoria, submissao, status, dataPrevista, dataResultado):
    arrayEscritorios = escritorios.split(",")

    format_str = '%d/%m/%Y'
    format_str2 = '%m/%Y'
    aDataPrevista = datetime.strptime(dataPrevista, format_str) if dataPrevista != "" else ""
    aDataResultado = datetime.strptime(dataResultado, format_str) if dataResultado != "" else ""
    
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'])
    df['DATA PREVISTA'] = df['DATA PREVISTA'].dt.strftime('%d/%m/%Y')
    
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'])
    df['DATA RESULTADO'] = df['DATA RESULTADO'].dt.strftime('%m/%Y')

    df['MÊS/ANO'] = pd.to_datetime(df['MÊS/ANO'])
    df['MÊS/ANO'] = df['MÊS/ANO'].dt.strftime('%m/%Y')

    if arrayEscritorios[0] is not None:
        for i in range(0, len(arrayEscritorios)):
            df2= pd.DataFrame([
                (arrayEscritorios[i],
                instituicao,
                categoria,
                aDataPrevista.strftime(format_str) if dataPrevista!="" else "",
                #dataPrevista if dataPrevista!="" else "",
                aDataPrevista.strftime(format_str2) if dataPrevista!="" else "",
                aDataResultado.strftime(format_str2) if dataResultado!="" else "",
                responsavel,
                submissao,
                status)], columns=("CLIENTE","INSTITUIÇÃO","CATEGORIAS","DATA PREVISTA","MÊS/ANO","DATA RESULTADO","RESPONSÁVEL","FAZ SUBMISSÃO? (S/N)","STATUS"))

            df = df.append(df2, ignore_index=True)
     

        df = df.replace(np.nan, '', regex=True)

        
        excelBook = openpy.load_workbook(w)
        with pd.ExcelWriter(w, engine='openpyxl', date_format='DD/MM/YYYY') as writer:
            # Save your file workbook as base
            writer.book = excelBook
            writer.sheets = dict((ws.title, ws) for ws in excelBook.worksheets)

            # Now here add your new sheets
            df.to_excel(writer,'CATEGORIAS PARA LIPE', index = False)

            # Save the file
            writer.save()

    return df

print(buscarInstituicoes(escritorios, instituicao, responsavel, categoria, submissao, status, dataPrevista, dataResultado))
sys.stdout.flush()