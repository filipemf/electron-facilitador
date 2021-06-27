# coding=UTF-8

import os
import numpy as np
import pandas as pd
from datetime import datetime
import openpyxl as openpy
import sys

pd.set_option('display.max_columns', None)

def buscarResponsaveis():
    filepath = os.path.join('c:/UltimaPlanilha', 'ultima_planilha.txt')

    f = open(filepath, "r")
    w = f.read()

    df = pd.read_excel(w, sheet_name="CATEGORIAS PARA LIPE")

    dfResponsaveis = df.iloc[:,6]
    dfResponsaveis = dfResponsaveis.dropna()

    responsaveis = []
    for row in dfResponsaveis:
        if row not in responsaveis:
            responsaveis.append(row)


    return responsaveis

print(buscarResponsaveis())

sys.stdout.flush()