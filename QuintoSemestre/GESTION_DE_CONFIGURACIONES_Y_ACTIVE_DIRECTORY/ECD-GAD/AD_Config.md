necesito crear una tabla de subneting para este proyecto: ¿Qué debes hacer?

1. Instalación de Active Directory

    Instalar el rol de Active Directory Domain Services (AD DS) en un servidor.
    Promocionar el servidor a controlador de dominio y configurar un nuevo dominio llamado "uidetechsolutions.local".

2. Creación de Usuarios y Grupos

    Crear usuarios para cada departamento (TI, Finanzas, RRHH) con las políticas de contraseña adecuadas.
    Configurar grupos de seguridad para cada departamento y asignar los usuarios correspondientes.

3. Creación y Aplicación de GPOs

    Crear y vincular una GPO para aplicar configuraciones de seguridad específicas, como el bloqueo de ciertas aplicaciones y la configuración de políticas de contraseñas.
    Implementar una GPO para redirigir las carpetas de documentos de los usuarios a un servidor centralizado.

4. Monitoreo y Reporte de GPOs

    Monitorear la aplicación de GPOs utilizando las herramientas de administración de AD.
    Generar informes de cumplimiento y ajustar las políticas según sea necesario" recuerda que tenemos tres areas y que seran configuradas por vlans por lo que quiero que hagas el subneteo para estos departamentos deja como minimo 10 host para cada area pero se libre de decidir cuantos host crear

Aquí está la tabla de subneteo basada en el formato proporcionado para los departamentos de tu proyecto:

##  Equipos
### *Router:* C7200
### *Swich:* SW3725

## **Subneteo**:
| **Departamento**         |   vlan     | **Hosts requeridos**  | **Rango de IP asignado**   | **Máscara**       | **Primera IP usable** | **Última IP usable**  |
|--------------------------|------------|---------------------- |----------------------------|-------------------|-----------------------|-----------------------|
| TI                       |    10      | 10                    | 192.168.1.0/28             | 255.255.255.240   | 192.168.1.1           | 192.168.1.14          |
| Finanzas                 |    20      | 10                    | 192.168.1.16/28            | 255.255.255.240   | 192.168.1.17          | 192.168.1.30          |
| RRHH                     |    30      | 10                    | 192.168.1.32/28            | 255.255.255.240   | 192.168.1.33          | 192.168.1.46          |
| LAB216 (AD y GPOs)       |    40      | 5                     | 192.168.1.48/29            | 255.255.255.248   | 192.168.1.49          | 192.168.1.54          |
| Reservado (Futuro)       |    50      | 10                    | 192.168.1.56/28            | 255.255.255.240   | 192.168.1.57          | 192.168.1.70          |

### Router

```bash
enable
configure terminal
# Interfaz física
interface fastEthernet0/0
 no shutdown
 exit
# Virtualización de subredes (subinterfaces)
interface fastEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.1.1 255.255.255.240
 exit
interface fastEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.1.17 255.255.255.240
 exit
interface fastEthernet0/0.30
 encapsulation dot1Q 30
 ip address 192.168.1.33 255.255.255.240
 exit
interface fastEthernet0/0.40
 encapsulation dot1Q 40
 ip address 192.168.1.49 255.255.255.240
 exit
interface fastEthernet0/0.50
 encapsulation dot1Q 50
 ip address 192.168.1.65 255.255.255.240
 exit
# Configuración DHCP para cada VLAN
ip dhcp pool TI
 network 192.168.1.0 255.255.255.240
 default-router 192.168.1.1
 exit
ip dhcp pool Finanzas
 network 192.168.1.16 255.255.255.240
 default-router 192.168.1.17
 exit
ip dhcp pool RRHH
 network 192.168.1.32 255.255.255.240
 default-router 192.168.1.33
 exit
ip dhcp pool LAB216
 network 192.168.1.48 255.255.255.248
 default-router 192.168.1.49
 exit 
ip dhcp pool Reservado
 network 192.168.1.66 255.255.255.240
 default-router 192.168.1.67
 exit

exit
write memory
```

## Swich
```bash
enable
configure terminal
# Configuración de VLANs
vlan 10
 name TI
vlan 20
 name Finanzas
vlan 30
 name RRHH
vlan 40
 name LAB216
vlan 50
 name Reservado
# Configuración de puerto trunk
interface FastEthernet0/0
 switchport mode trunk
 no shutdown
 exit
# Asignación de puertos de acceso para cada VLAN
interface range FastEthernet0/2-6
 switchport mode access
 switchport access vlan 10
 no shutdown

interface range FastEthernet0/7-8
 switchport mode access
 switchport access vlan 20
 no shutdown

interface range FastEthernet0/9-10
 switchport mode access
 switchport access vlan 30
 no shutdown

interface range FastEthernet0/11-12
 switchport mode access
 switchport access vlan 40
 no shutdown

interface range FastEthernet0/13-14
 switchport mode access
 switchport access vlan 50
 no shutdown

exit
write memory

```

##  Script AD





```powershell
# 1. Instalación de Active Directory Domain Services
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Variables de configuración
$DomainName = "uidetechsolutions.local"
$NetbiosName = "UIDETECHSOL"
$SafeModeAdminPassword = ConvertTo-SecureString "P@ssw0rd123!" -AsPlainText -Force

# Promocionar a controlador de dominio
Install-ADDSForest `
    -DomainName $DomainName `
    -DomainNetbiosName $NetbiosName `
    -InstallDns:$true `
    -SafeModeAdministratorPassword $SafeModeAdminPassword `
    -Force:$true


# 2. Creación de Unidades Organizativas (OUs)
$OUs = @("TI", "Finanzas", "RRHH")
foreach ($OU in $OUs) {
    New-ADOrganizationalUnit -Name $OU -Path "DC=uidetechsolutions,DC=local"
}

# Función para crear usuarios
function Create-DepartmentUser {
    param (
        [string]$Username,
        [string]$Department,
        [string]$Password
    )
    
    $SecurePassword = ConvertTo-SecureString $Password -AsPlainText -Force
    $UserPrincipalName = "$Username@$DomainName"
    $OUPath = "OU=$Department,DC=uidetechsolutions,DC=local"
    
    New-ADUser `
        -Name $Username `
        -UserPrincipalName $UserPrincipalName `
        -SamAccountName $Username `
        -Department $Department `
        -Path $OUPath `
        -AccountPassword $SecurePassword `
        -Enabled $true `
        -PasswordNeverExpires $false `
        -ChangePasswordAtLogon $true
}

# Crear usuarios para cada departamento
$Users = @{
    "TI" = @("admin1", "soporte1", "desarrollo1")
    "Finanzas" = @("contador1", "tesorero1", "analista1")
    "RRHH" = @("rrhh1", "recruiter1", "capacitador1")
}

foreach ($Dept in $Users.Keys) {
    foreach ($User in $Users[$Dept]) {
        Create-DepartmentUser -Username $User -Department $Dept -Password "Welcome2024!"
    }
}

# Crear grupos de seguridad
foreach ($Dept in $OUs) {
    New-ADGroup `
        -Name "GS_$Dept" `
        -GroupCategory Security `
        -GroupScope Global `
        -Path "OU=$Dept,DC=uidetechsolutions,DC=local"
    
    # Agregar usuarios al grupo correspondiente
    $Users[$Dept] | ForEach-Object {
        Add-ADGroupMember -Identity "GS_$Dept" -Members $_
    }
}

# 3. Creación de GPOs
# GPO de Seguridad
$GPOSecurity = New-GPO -Name "SecurityPolicy"
Set-GPRegistryValue -Name "SecurityPolicy" -Key "HKLM\Software\Policies\Microsoft\Windows\System" -ValueName "DisableCMD" -Type DWord -Value 1
New-GPLink -Name "SecurityPolicy" -Target "DC=uidetechsolutions,DC=local"

# GPO para redirección de carpetas
$GPOFolderRedirection = New-GPO -Name "FolderRedirection"
$Server = "\\fileserver\users$"
Set-GPRegistryValue -Name "FolderRedirection" -Key "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" -ValueName "Personal" -Type ExpandString -Value "$Server\%username%\Documents"
New-GPLink -Name "FolderRedirection" -Target "DC=uidetechsolutions,DC=local"

# 4. Monitoreo de GPOs
# Generar informe de GPOs
$Date = Get-Date -Format "yyyy-MM-dd"
#
Get-GPOReport -All -ReportType HTML -Path "C:\GPOReports\GPOReport_$Date.html"

# Verificar estado de las GPOs
Get-GPResultantSetOfPolicy -ReportType HTML -Path "C:\GPOReports\GPOResultant_$Date.html"

Write-Host "Configuración completada. Por favor, revise los informes en C:\GPOReports\"
```