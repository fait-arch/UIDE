# **4. Monitoreo y Reporte de GPOs**

En este paso se abordan dos objetivos principales:

1. **Monitorear la aplicación de las GPOs**: Es esencial asegurarse de que las Políticas de Grupo (GPOs) se apliquen correctamente a los usuarios y equipos en la red.
  
2. **Generar informes de cumplimiento**: Estos informes permiten verificar si las políticas están funcionando según lo esperado y si se requiere realizar ajustes adicionales.

Vamos a desglosar los pasos proporcionados para explicar cómo se cumple con estos objetivos:

---

#### **1. Generación de Informes de GPOs**

Los informes permiten auditar las configuraciones de las políticas de grupo aplicadas en el entorno, lo cual ayuda a detectar inconsistencias y asegurarse de que las configuraciones deseadas se implementen correctamente.

```powershell
# Generar informe de todas las GPOs
$Date = Get-Date -Format "yyyy-MM-dd"

# Se utiliza el cmdlet Get-GPOReport para generar un informe de todas las GPOs en formato HTML
Get-GPOReport -All -ReportType HTML -Path "C:\GPOReports\GPOReport_$Date.html"
```

**Explicación:**

- **Get-Date -Format "yyyy-MM-dd"**: Este comando obtiene la fecha actual y la formatea en el formato **YYYY-MM-DD**, lo cual será útil para generar nombres de archivos únicos para cada informe generado (por ejemplo, para evitar sobrescribir informes previos).
  
- **Get-GPOReport -All -ReportType HTML -Path "C:\GPOReports\GPOReport_$Date.html"**: Este comando genera un informe detallado en formato **HTML** de todas las GPOs que están definidas en el dominio:
  - **-All**: Recupera todas las GPOs aplicadas.
  - **-ReportType HTML**: El tipo de informe que se generará será en formato **HTML** para poder visualizarlos fácilmente a través de un navegador.
  - **-Path "C:\GPOReports\GPOReport_$Date.html"**: El informe se guarda en la carpeta **C:\GPOReports**, con el nombre del archivo que incluye la fecha, para poder distinguir los informes generados en diferentes días.

Este informe proporciona detalles sobre todas las GPOs existentes en el dominio, incluidas las configuraciones específicas de cada una de ellas.

---

#### **2. Verificación del Estado de las GPOs**

Es importante verificar el estado de las políticas de grupo aplicadas a un equipo o usuario específico para asegurarse de que se apliquen correctamente. El siguiente comando verifica las políticas resultantes para un equipo o usuario y genera un informe sobre su estado:

```powershell
# Verificar el estado de las GPOs aplicadas al usuario/maquina
Get-GPResultantSetOfPolicy -ReportType HTML -Path "C:\GPOReports\GPOResultant_$Date.html"
```

**Explicación:**

- **Get-GPResultantSetOfPolicy**: Este cmdlet se utiliza para obtener un **resultado combinado** de todas las GPOs aplicadas a un equipo o usuario específico, permitiendo verificar qué políticas se han aplicado realmente, si hay conflictos, y qué configuraciones finales prevalecen.
  
- **-ReportType HTML**: El informe de políticas resultantes se generará en formato **HTML**, que es fácil de leer e interpretar.
  
- **-Path "C:\GPOReports\GPOResultant_$Date.html"**: El informe se guardará en la misma carpeta **C:\GPOReports** y se nombrará con la fecha para facilitar la gestión de los archivos.

Este informe muestra las políticas aplicadas, incluidas las configuraciones que se heredan de GPOs vinculadas a sitios, dominios o unidades organizativas (OUs), y las configuraciones específicas de usuario o equipo.


####    Resultado:
![VaraiblesConfiguracion](../img/MonitoreoGPOs.png)