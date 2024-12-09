## **Actividad 1: Instalación y configuración de Active Directory**

### **Pasos**:
1. **Instalar el rol de AD DS**:
   - Usar el cmdlet `Install-WindowsFeature`.
   - Incluir los servicios necesarios (`RSAT-AD-Tools`).

2. **Promover a controlador de dominio**:
   - Configurar un nuevo bosque y dominio con el cmdlet `Install-ADDSForest`.

3. **Configurar parámetros adicionales**:
   - Especificar el nombre del dominio, contraseñas de restauración de servicios, y reiniciar automáticamente.

### **Script de PowerShell**:
```powershell
# Instalar AD DS
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Configurar controlador de dominio
Install-ADDSForest `
    -DomainName "uide.edu" ` 
    -SafeModeAdministratorPassword (ConvertTo-SecureString "Admin_P@sw0rd" -AsPlainText -Force) `
    -Force
```

### **Entregables**:
- Capturas de pantalla mostrando:


---

## **Actividad 2: Configuración de Usuarios y Grupos**

### **Pasos**:
1. **Crear Unidades Organizativas (OUs)**:
   - Usar el cmdlet `New-ADOrganizationalUnit`.

2. **Crear Usuarios**:
   - Utilizar `New-ADUser`, asignar contraseñas y habilitarlos.

3. **Crear Grupos y asignar usuarios**:
   - Usar `New-ADGroup` para grupos y `Add-ADGroupMember` para asignar usuarios.

### **Script de PowerShell**:
```powershell
# Crear OUs
New-ADOrganizationalUnit -Name "Ventas" -Path "DC=uide,DC=edu"
New-ADOrganizationalUnit -Name "TI" -Path "DC=uide,DC=edu"

# Crear usuarios
New-ADUser -Name "Sofia Padilla" -SamAccountName "jpadilla" -Path "OU=Ventas,DC=uide,DC=edu" `
    -AccountPassword (ConvertTo-SecureString "spadilla_123" -AsPlainText -Force) -Enabled $true
New-ADUser -Name "Juan Moromenacho" -SamAccountName "fait-arch" -Path "OU=TI,DC=uide,DC=edu" `
    -AccountPassword (ConvertTo-SecureString "jmoromenacho_123" -AsPlainText -Force) -Enabled $true

# Crear grupo y agregar usuarios
New-ADGroup -Name "AdminVentas" -GroupScope Global -Path "OU=Ventas,DC=uide,DC=edu"
Add-ADGroupMember -Identity "AdminVentas" -Members "jpadilla"
```

### **Entregables**:
- Capturas de pantalla de usuarios y grupos creados.

---

## **Actividad 3: Gestión de Impresoras**

### **Pasos**:
1. **Instalar módulo de impresoras**:
   - Usar `Install-WindowsFeature Print-Services`.

2. **Configurar impresoras compartidas**:
   - Utilizar `Add-PrinterPort`, `Add-Printer`, y `Set-Printer`.

3. **Políticas de impresión**:
   - Usar directivas de grupo para controlar el acceso.

### **Script de PowerShell**:
```powershell
# Instalar el rol de impresión
Install-WindowsFeature -Name Print-Services

# Configurar impresora compartida
Add-PrinterPort -Name "IP_192.168.1.100" -PrinterHostAddress "192.168.1.100"
Add-Printer -Name "ImpresoraVentas" -DriverName "Microsoft PS Class Driver" `
    -PortName "IP_192.168.1.100" -Shared -ShareName "VentasPrinter"

# Configurar política de impresión
Set-Printer -Name "ImpresoraVentas" -PermissionSDDL "O:BAG:SYD:(A;;RPWP;;;AU)"
```

### **Entregables**:
- Capturas mostrando impresoras instaladas y compartidas.


---

## **Actividad 4: Redirección de Carpetas**

### **Pasos**:
1. **Crear una política de grupo**:
   - Usar `New-GPO`.

2. **Configurar redirección**:
   - Modificar configuraciones de redirección de carpetas con el módulo `GroupPolicy`.

3. **Vincular política**:
   - Usar `New-GPLink`.

### **Script de PowerShell**:
```powershell
# Crear una nueva política
$GPO = New-GPO -Name "RedireccionCarpetas"

# Configurar redirección de carpetas (Ejemplo para Documentos)
Set-GPRegistryValue -Name "RedireccionCarpetas" -Key "Software\Policies\Microsoft\Windows\System" `
    -ValueName "FolderRedirectionPolicy" -Value "Redirect"

# Vincular política
New-GPLink -Name "RedireccionCarpetas" -Target "OU=Ventas,DC=uide,DC=edu"
```

### **Entregables**:
- Capturas de políticas aplicadas.
- Scripts detallados.

---

## **Actividad 5: Implementación de Parches y Cifrado**

### **Pasos**:
1. **Configurar actualizaciones**:
   - Instalar `PSWindowsUpdate` y programar parches con `Set-ScheduledTask`.

2. **Cifrado**:
   - Configurar BitLocker con `Enable-BitLocker`.
   - Usar CMS para cifrar archivos.

### **Script de PowerShell**:
```powershell
# Instalar módulo PSWindowsUpdate
Install-Module -Name PSWindowsUpdate -Force

# Programar actualizaciones
Install-WindowsUpdate -AcceptAll -AutoReboot

# Configurar BitLocker
Enable-BitLocker -MountPoint "C:" -RecoveryPasswordProtector
```

### **Entregables**:
- Informe justificando la seguridad añadida.
- Capturas de actualizaciones y discos cifrados.

