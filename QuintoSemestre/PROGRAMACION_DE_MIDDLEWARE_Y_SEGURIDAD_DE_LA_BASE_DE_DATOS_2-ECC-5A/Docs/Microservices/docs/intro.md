---
sidebar_position: 1
---

# Introduccion 

##  ¿Qué son los microservicios?
Los microservicios son un patron de diseño de softaware donde cada funcion del sistema es su porpio servicio, estos servicios se implementan en contenedores y estos servicios se comunican entre si.
En el libro **Building Microservices** de *Sam Newman*, menciona que los microservicios son servicios pequeños y autónomos que trabajan juntos.

A pesar de la tendencia a crear bases de código monolíticas y modulares, a menudo se rompen los límites, dispersando el código relacionado con funciones similares, lo que dificulta la corrección de errores o implementaciones. En sistemas monolíticos, intentamos mantener la cohesión mediante abstracciones o módulos. Este concepto de cohesión es clave al pensar en microservicios, respaldado por el Principio de Responsabilidad Única de Robert C. Martin, que establece: "Reúne lo que cambia por la misma razón y separa lo que cambia por razones diferentes".

## Glosario
- **Servicio:** Es una unidad de funcionalidad que realiza una tarea específica dentro de un sistema. En el contexto de los microservicios, un servicio se refiere a un componente del sistema que está diseñado para hacer una función específica de forma independiente.
- **Servicio:**
- **Servicio:**

##  Preguntas
### ¿Qué significa un "microservicio pequeño"?
En términos de líneas de código. La razón principal es que la cantidad de líneas de código no es un buen indicador para medir la "pequeñez" de un servicio, ya que varios factores.

Puntos a tomar en cuenta:
- Lenguajes de programación: Algunos lenguajes son más expresivos que otros, lo que significa que con menos líneas de código se pueden realizar tareas más complejas.
- Dependencias externas: El uso de librerías o dependencias de terceros puede agregar muchas líneas de código, pero no necesariamente representa una complejidad añadida al microservicio en sí.
- Complejidad del dominio: El problema que se resuelve con el microservicio puede ser intrínsecamente complejo, lo que justifica tener más líneas de código.

### ¿Cómo determinar si un microservicio es lo suficientemente pequeño sin llegar a ser innecesariamente reducido?
La implicación es que, una vez que un fragmento de código ya no parece "demasiado grande" o difícil de manejar, probablemente se puede considerar que es lo suficientemente pequeño. En otras palabras, **si el sistema no resulta abrumador o difícil de gestionar, es probable que tenga el tamaño adecuado para ser un microservicio**.


:::note Fuente
Diagrama cortesía de Atlassian
:::
