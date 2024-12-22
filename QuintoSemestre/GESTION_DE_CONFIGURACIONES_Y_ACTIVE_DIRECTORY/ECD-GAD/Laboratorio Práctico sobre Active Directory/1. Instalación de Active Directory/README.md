# Guía para la Instalación y Configuración de Active Directory Domain Services (AD DS)

Esta guía describe los pasos necesarios para instalar y configurar **Active Directory Domain Services (AD DS)** en un servidor, promocionando dicho servidor a controlador de dominio y configurando un nuevo dominio llamado **`uidetechsolutions.local`**.

## Requisitos Previos
Antes de comenzar, asegúrate de que tu servidor cumpla con los siguientes requisitos:
- Windows Server (por ejemplo, Windows Server 2016, 2019 o 2022).
- Acceso a PowerShell con privilegios administrativos.
- Conexión a Internet para descargar e instalar características del sistema si es necesario.

## Pasos para la Instalación y Configuración

### 1. Instalar el Rol de **Active Directory Domain Services (AD DS)**

El primer paso es instalar el rol de **Active Directory Domain Services** en el servidor. Para ello, se debe ejecutar el siguiente comando en PowerShell:

```powershell
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```

Este comando instala el rol necesario y las herramientas de administración de Active Directory.

####    Resultado:
![Instalar AD](../img/InstalaciónActiveDirectoryDomainServices.png)

### 2. Configurar Variables de Configuración

Definimos las variables que se utilizarán durante la promoción del servidor a controlador de dominio. A continuación, se definen los valores de las siguientes variables:

- **$DomainName**: El nombre del dominio completo (FQDN) que queremos configurar.
- **$NetbiosName**: El nombre NetBIOS que será utilizado para identificar el dominio en la red.
- **$SafeModeAdminPassword**: La contraseña de modo seguro del administrador del dominio.

Ejecuta el siguiente script en PowerShell para definir las variables:

```powershell
# Variables de configuración
$DomainName = "uidetechsolutions.local"
$NetbiosName = "UIDETECHSOL"
$SafeModeAdminPassword = ConvertTo-SecureString "Uide.asu.123" -AsPlainText -Force
```

####    Resultado:
![VaraiblesConfiguracion](../img/VariablesConfiguracion.png)

### 3. Promocionar el Servidor a Controlador de Dominio

Una vez que el rol de **Active Directory Domain Services** ha sido instalado y las variables de configuración están definidas, podemos proceder a promocionar el servidor a **controlador de dominio** y configurar el nuevo dominio.

Ejecuta el siguiente comando en PowerShell para realizar esta tarea:

```powershell
Install-ADDSForest `
    -DomainName $DomainName `
    -DomainNetbiosName $NetbiosName `
    -InstallDns:$true `
    -SafeModeAdministratorPassword $SafeModeAdminPassword `
    -Force:$true
```


####    Resultado:
![VaraiblesConfiguracion](../img/CreaciónUnidadesOrganizativas.png)

Este comando realiza lo siguiente:
- **-DomainName $DomainName**: Define el nombre completo del dominio (en este caso, `uidetechsolutions.local`).
- **-DomainNetbiosName $NetbiosName**: Establece el nombre NetBIOS del dominio (en este caso, `UIDETECHSOL`).
- **-InstallDns:$true**: Instala y configura el servicio DNS, que es necesario para que el dominio funcione correctamente.
- **-SafeModeAdministratorPassword $SafeModeAdminPassword**: Configura la contraseña para el administrador del modo seguro (el administrador que se utilizará para la recuperación del dominio en caso de emergencia).
- **-Force:$true**: Fuerza la instalación sin pedir confirmación.

### 4. Reiniciar el Servidor

Una vez completado el proceso de promoción, el servidor necesitará reiniciarse para que los cambios surtan efecto. Esto se puede hacer de manera manual, o puedes utilizar el siguiente comando para reiniciar automáticamente el servidor desde PowerShell:

```powershell
Restart-Computer
```

Después de reiniciar, el servidor se convertirá en el **controlador de dominio** de `uidetechsolutions.local`.

####    Resultado:
![VaraiblesConfiguracion](../img/Captura%20desde%202024-12-21%2017-04-28.)

## Verificación de la Instalación

Una vez que el servidor se haya reiniciado, puedes verificar que el rol de **Active Directory Domain Services** se haya instalado correctamente utilizando el siguiente comando de PowerShell:

```powershell
Get-WindowsFeature -Name AD-Domain-Services
```

Si la instalación fue exitosa, deberías ver que el rol está marcado como "Instalado".

Además, puedes verificar el estado del controlador de dominio y otros detalles de Active Directory utilizando las herramientas de administración de AD DS, como **Active Directory Users and Computers** o **Active Directory Sites and Services**.

## Conclusión

Con estos pasos, has instalado y configurado correctamente **Active Directory Domain Services (AD DS)** en un servidor, promoviendo el servidor a controlador de dominio y creando el dominio `uidetechsolutions.local`. Ahora puedes gestionar usuarios, grupos y otras configuraciones de Active Directory dentro de este dominio.
