# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import date, datetime
import openpyxl as openpy
import sys

def salvarRow(grupos, nomeCategoria, dataPrevista, dataResultado, responsaveis, submissao, status, escritorios):
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    df = df.fillna("")

    gruposArray = grupos.split(",")

    instituicoes = gruposArray[0].split(': ')[0]
    categorias = ': '.join(gruposArray[0].split(': ')[1:])

    
    filepath2 = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f2 = open(filepath2, "r")
    w2 = f2.read()

    
    dfCut = pd.read_excel(w2, sheet_name="CATEGORIAS PARA LIPE")
    dfCut = dfCut.fillna("")

    format_str = '%d/%m/%Y'
    format_str2 = '%m/%Y'
    aDataPrevista = datetime.strptime(dataPrevista, format_str) if dataPrevista != "" else ""
    aDataResultado = datetime.strptime(dataResultado, format_str2) if dataResultado != "" else ""

    
    df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'])
    df['DATA PREVISTA'] = df['DATA PREVISTA'].dt.strftime('%d/%m/%Y')
    
    df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'])
    df['DATA RESULTADO'] = df['DATA RESULTADO'].dt.strftime('%m/%Y')

    df['MÊS/ANO'] = pd.to_datetime(df['MÊS/ANO'])
    df['MÊS/ANO'] = df['MÊS/ANO'].dt.strftime('%m/%Y')

    for item in escritorios:
        df3= pd.DataFrame([
            (item,
            instituicoes,
            nomeCategoria,
            aDataPrevista.strftime(format_str) if dataPrevista!="" else "",
                #dataPrevista if dataPrevista!="" else "",
            aDataPrevista.strftime('%m/%Y') if dataPrevista!="" else "",
            aDataResultado.strftime('%m/%Y') if dataResultado!="" else "",
            responsaveis,
            submissao,
            status)], columns=("CLIENTE","INSTITUIÇÃO","CATEGORIAS","DATA PREVISTA","MÊS/ANO","DATA RESULTADO","RESPONSÁVEL","FAZ SUBMISSÃO? (S/N)","STATUS"))

        df = df.append(df3, ignore_index=True)


        for item in escritorios:
            dfCut2 = dfCut[dfCut['INSTITUIÇÃO']==instituicoes]

            dfCut2 = dfCut2[dfCut2['CATEGORIAS']==categorias]

            dfCut2 = dfCut2[dfCut2['CLIENTE']==item]

            
            index = int(dfCut2.index[0])
            df = df.drop(index)

    return df

print(salvarRow("CHAMBERS AND PARTNERS: Agribusiness", "Gribusin","21/02/2021", "08/2019","Livia", "Submetido","Sim", ["CM"]))

sys.stdout.flush()