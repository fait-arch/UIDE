# 3. Cireación y Aplicación de GPOs

El objetivo de esta etapa es **crear y aplicar políticas de grupo (GPOs)** que permitan realizar configuraciones de seguridad específicas (como bloquear aplicaciones) y también implementar la **redirección de carpetas** para centralizar el almacenamiento de documentos de los usuarios en un servidor.

A continuación, te explico los pasos detallados y la función de cada comando que has proporcionado:

---

#### **1. GPO de Seguridad**

```powershell
# Crear una GPO de Seguridad
$GPOSecurity = New-GPO -Name "SecurityPolicy"
Set-GPRegistryValue -Name "SecurityPolicy" -Key "HKLM\Software\Policies\Microsoft\Windows\System" -ValueName "DisableCMD" -Type DWord -Value 1
New-GPLink -Name "SecurityPolicy" -Target "DC=uidetechsolutions,DC=local"
```

**Explicación:**

- **$GPOSecurity = New-GPO -Name "SecurityPolicy"**: Crea una nueva Política de Grupo (GPO) llamada **"SecurityPolicy"**. Esta GPO contendrá configuraciones específicas relacionadas con la seguridad del sistema.
  
- **Set-GPRegistryValue -Name "SecurityPolicy" -Key "HKLM\Software\Policies\Microsoft\Windows\System" -ValueName "DisableCMD" -Type DWord -Value 1**: Este comando configura una clave de registro dentro de la GPO de seguridad para deshabilitar el acceso a la línea de comandos (CMD) de Windows, que es una medida de seguridad para evitar que los usuarios puedan ejecutar comandos de manera no autorizada:
  - **DisableCMD = 1**: Esta configuración desactiva el acceso al símbolo del sistema (`CMD`).
  - La clave de registro específica es **HKLM\Software\Policies\Microsoft\Windows\System**, lo cual se refiere a configuraciones relacionadas con el sistema operativo a nivel de seguridad.

- **New-GPLink -Name "SecurityPolicy" -Target "DC=uidetechsolutions,DC=local"**: Este comando **vincula** la GPO recién creada ("SecurityPolicy") al dominio **uidetechsolutions.local**, lo que significa que la política de seguridad se aplicará a todos los equipos y usuarios dentro de este dominio.

---

#### **2. GPO para Redirección de Carpetas**

```powershell
# Crear una GPO para la redirección de carpetas
$GPOFolderRedirection = New-GPO -Name "FolderRedirection"
$Server = "\\fileserver\users$"
Set-GPRegistryValue -Name "FolderRedirection" -Key "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -ValueName "Personal" -Type ExpandString -Value "$Server\%username%\Documents"
New-GPLink -Name "FolderRedirection" -Target "DC=uidetechsolutions,DC=local"
```

**Explicación:**

- **$GPOFolderRedirection = New-GPO -Name "FolderRedirection"**: Crea una nueva GPO llamada **"FolderRedirection"**. Esta GPO será utilizada para redirigir la carpeta **"Mis Documentos"** de los usuarios a una ubicación centralizada en un servidor, permitiendo un mejor control y acceso a los documentos de los usuarios.

- **$Server = "\\fileserver\users$"**: Define la ruta del servidor de archivos donde se almacenarán las carpetas de los usuarios. Aquí se utiliza una ubicación compartida en el servidor **fileserver**, en el directorio **users$**, que es donde se almacenarán los documentos de todos los usuarios.
  
- **Set-GPRegistryValue -Name "FolderRedirection" -Key "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -ValueName "Personal" -Type ExpandString -Value "$Server\%username%\Documents"**: Configura la redirección de la carpeta **"Mis Documentos"** a la ruta del servidor especificada en el comando anterior. Esto se hace modificando el valor de la clave de registro que controla la ubicación de la carpeta de documentos de los usuarios:
  - **HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders**: Esta es la clave de registro donde se configura la ubicación de la carpeta **"Personal"** (Mis Documentos) del usuario.
  - **ExpandString**: Utiliza una cadena expandida para que la ruta sea dinámica y se adapte a cada usuario.
  - **$Server\%username%\Documents**: Especifica que la carpeta de documentos de cada usuario se almacenará en la ruta definida en la variable **$Server**, bajo una carpeta con el nombre del usuario (**%username%**), lo que garantiza que cada usuario tendrá su propio espacio en el servidor.

- **New-GPLink -Name "FolderRedirection" -Target "DC=uidetechsolutions,DC=local"**: Este comando **vincula** la GPO "FolderRedirection" al dominio **uidetechsolutions.local**, lo que asegura que la redirección de la carpeta **Mis Documentos** se aplicará a todos los usuarios del dominio.
