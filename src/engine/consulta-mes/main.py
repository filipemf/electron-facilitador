import os
import numpy as np
import pandas as pd
from datetime import datetime
import openpyxl as openpy
import sys

mes = sys.argv[1]
ano = sys.argv[2]
opcao = sys.argv[3]

pd.set_option('display.max_columns', None)

def buscarMesPrevista(oMes, ano):
    if ano != "todos":
        print("data prevista e todos")
        print(ano)
        filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

        f = open(filepath, "r")
        w = f.read()

        df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")


        df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], format="%d/%m/%Y")

        nov_mask = df['DATA PREVISTA'].map(lambda x: x.month) == int(oMes)

        df2 = df[nov_mask]

        ano_mask = df2['DATA PREVISTA'].map(lambda x: x.year) == int(ano)

        df3 = df2[ano_mask]

        df3 = df3.replace(np.nan, '', regex=True)
        #df.to_json(orient="records")[1:-1].replace('},{', '} {')

        resultadoFinal = df3.to_html(index = False)
        return resultadoFinal


    else:
        filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

        f = open(filepath, "r")
        w = f.read()

        df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")


        df['DATA PREVISTA'] = pd.to_datetime(df['DATA PREVISTA'], format="%d/%m/%Y")

        nov_mask = df['DATA PREVISTA'].map(lambda x: x.month) == int(oMes)

        df2 = df[nov_mask]

        df2 = df2.replace(np.nan, '', regex=True)
        #df.to_json(orient="records")[1:-1].replace('},{', '} {')

        resultadoFinal = df2.to_html(index = False)

        return resultadoFinal



def buscarMesResultado(oMes, ano):    
    if ano != "todos":
        filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

        f = open(filepath, "r")
        w = f.read()

        df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")


        df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'], format="%m/%Y")

        nov_mask = df['DATA RESULTADO'].map(lambda x: x.month) == int(oMes)

        df2 = df[nov_mask]

        ano_mask = df2['DATA RESULTADO'].map(lambda x: x.year) == int(ano)

        df3 = df2[ano_mask]

        df3 = df3.replace(np.nan, '', regex=True)
        #df.to_json(orient="records")[1:-1].replace('},{', '} {')

        resultadoFinal = df3.to_html(index = False)
        return resultadoFinal


    else:
        filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

        f = open(filepath, "r")
        w = f.read()

        df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")


        df['DATA RESULTADO'] = pd.to_datetime(df['DATA RESULTADO'], format="%m/%Y")

        nov_mask = df['DATA RESULTADO'].map(lambda x: x.month) == int(oMes)

        df2 = df[nov_mask]

        df2 = df2.replace(np.nan, '', regex=True)
        #df.to_json(orient="records")[1:-1].replace('},{', '} {')

        resultadoFinal = df2.to_html(index = False)
        
        return resultadoFinal


if opcao == "prevista":
    print(buscarMesPrevista(mes, ano))
else:
    print(buscarMesResultado(mes, ano))

sys.stdout.flush()