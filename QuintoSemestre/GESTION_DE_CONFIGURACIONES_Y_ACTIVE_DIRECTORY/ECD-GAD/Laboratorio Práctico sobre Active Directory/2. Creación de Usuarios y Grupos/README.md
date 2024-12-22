# 2. Creación de Unidades Organizativas (OUs), Usuarios y Grupos

### Objetivo:
1. **Crear Unidades Organizativas (OUs)** para diferentes departamentos.
2. **Crear usuarios** para cada departamento (TI, Finanzas, LAB216, LABBIO, RRHH) y asignarles contraseñas.
3. **Configurar grupos de seguridad** para cada departamento y agregar los usuarios correspondientes.

### Detalle de los Comandos:

#### 1. Crear Unidades Organizativas (OUs):

```powershell
$OUs = @("TI", "Finanzas", "LAB216", "LABBIO", "RRHH")
foreach ($OU in $OUs) {
    New-ADOrganizationalUnit -Name $OU -Path "DC=uidetechsolutions,DC=local"
}
```

**Explicación:**
- **$OUs**: Se define un array con los nombres de las unidades organizativas (OUs) que se van a crear: TI, Finanzas, LAB216, LABBIO, RRHH.
- **foreach ($OU in $OUs)**: Itera sobre cada elemento (departamento) de la lista `$OUs`.
- **New-ADOrganizationalUnit**: Para cada departamento, crea una nueva **Unidad Organizativa (OU)** en Active Directory:
  - **-Name $OU**: El nombre de la OU será el nombre de cada departamento.
  - **-Path "DC=uidetechsolutions,DC=local"**: Define el dominio en el que se creará la OU, en este caso, `uidetechsolutions.local`.


####    Resultado:
![VaraiblesConfiguracion](../img/CreaciónGPOs.png)

#### 2. Función para Crear Usuarios en OUs:

```powershell
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
```

**Explicación:**
- **Create-DepartmentUser**: Define una función que crea un usuario de Active Directory dentro de una unidad organizativa específica para un departamento.
- **Parámetros de la función**:
  - **$Username**: El nombre de usuario del empleado.
  - **$Department**: El nombre del departamento (correspondiente a la OU donde se creará el usuario).
  - **$Password**: La contraseña del usuario.
  
  Dentro de la función:
  - **$SecurePassword**: Convierte la contraseña en un formato seguro utilizando `ConvertTo-SecureString`.
  - **$UserPrincipalName**: Establece el nombre principal del usuario (UPN), que es la dirección de correo electrónico del usuario con el formato `usuario@dominio`.
  - **$OUPath**: Define la ruta de la OU del departamento donde el usuario será creado.
  - **New-ADUser**: Crea el usuario con los siguientes parámetros:
    - **-Name $Username**: El nombre del usuario.
    - **-UserPrincipalName $UserPrincipalName**: El UPN del usuario.
    - **-SamAccountName $Username**: El nombre de la cuenta SAM (nombre corto).
    - **-Department $Department**: El departamento al que pertenece el usuario.
    - **-Path $OUPath**: La ruta de la OU donde se almacenará el usuario.
    - **-AccountPassword $SecurePassword**: Establece la contraseña del usuario.
    - **-Enabled $true**: Habilita la cuenta de usuario.
    - **-PasswordNeverExpires $false**: Indica que la contraseña del usuario no está configurada para nunca expirar (se puede modificar según la política).
    - **-ChangePasswordAtLogon $true**: Obliga al usuario a cambiar la contraseña en el primer inicio de sesión.


#### 3. Crear Usuarios para Cada Departamento:

```powershell
$Users = @{
    "TI" = @("admin1", "soporte1", "desarrollo1")
    "LAB216" = @("Lab001", "Lab002", "Lab003")
    "LABBIO" = @("sofia", "anni", "desarrollo1")
    "Finanzas" = @("contador1", "tesorero1", "analista1")
    "RRHH" = @("rrhh1", "recruiter1", "capacitador1")
}

foreach ($Dept in $Users.Keys) {
    foreach ($User in $Users[$Dept]) {
        Create-DepartmentUser -Username $User -Department $Dept -Password "Welcome2024!"
    }
}
```

**Explicación:**
- **$Users**: Define un diccionario con los departamentos como claves (`"TI"`, `"LAB216"`, `"LABBIO"`, `"Finanzas"`, `"RRHH"`) y una lista de nombres de usuario asociados a cada uno.
- **foreach ($Dept in $Users.Keys)**: Itera sobre los departamentos en el diccionario `$Users`.
- **foreach ($User in $Users[$Dept])**: Itera sobre cada usuario dentro de cada departamento.
- **Create-DepartmentUser**: Llama a la función `Create-DepartmentUser` para crear cada usuario, pasando el nombre de usuario, el departamento y una contraseña predeterminada (`"Welcome2024!"`). Este proceso crea a los usuarios dentro de las respectivas Unidades Organizativas (OUs).

####    Resultado:
![VaraiblesConfiguracion](../img/CrearUsuariosParaDepartamento.png)


#### 4. Crear Grupos de Seguridad y Asignar Usuarios:

```powershell
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
```

**Explicación:**
- **foreach ($Dept in $OUs)**: Itera sobre cada uno de los departamentos (OUs).
- **New-ADGroup**: Crea un **grupo de seguridad** en Active Directory para cada departamento:
  - **-Name "GS_$Dept"**: El nombre del grupo será "GS_" seguido del nombre del departamento (por ejemplo, "GS_TI", "GS_LAB216").
  - **-GroupCategory Security**: El grupo será un grupo de **seguridad**, lo que permite asignar permisos a usuarios y recursos.
  - **-GroupScope Global**: El alcance del grupo será **global**, lo que significa que el grupo puede contener miembros de cualquier dominio dentro del bosque.
  - **-Path "OU=$Dept,DC=uidetechsolutions,DC=local"**: Especifica la ruta en el dominio donde se creará el grupo de seguridad, dentro de la OU correspondiente al departamento.
  
- **Add-ADGroupMember**: Luego, se agregan los usuarios correspondientes al grupo de seguridad del departamento:
  - **-Identity "GS_$Dept"**: Se refiere al grupo de seguridad de ese departamento.
  - **-Members $_**: Agrega los usuarios del departamento al grupo de seguridad.


####    Resultado:
![VaraiblesConfiguracion](../img/CrearUsuariosParaDepartamento.png)