# Project Name

Project Description

### Todo

- [ ] Actualización automática  de app  
- [ ] Eliminar refererencias  a angularfire2: revisión  
- [ ] Logo saval a SVG  
- [ ] ordenar tabla  
- [ ] ordenar selects por numero o nombre  
- [ ] realizar busqueda por codigo en cache  
- [ ] revisar metodos en asset service  
- [ ] revisar base service  
- [ ] revision de cuando vuelve a a estar offline [preguntar mas detalles]  
- [ ] revision de baja de activo fijo offline  

### Blocked

- [ ] Modo Offline  
  - [ ] Solicitar restriccion de  registrar en api  si hay algun cambio en el af mientras este offline y  rechazar es te cambio, Explicando este rechazo.[bloquedo por bex]  
  - [ ] revisar problema de grabado en move asset [bloqueado por bex]  

### In Progress

- [ ] Restringir acciones de asset si se realizo alguna accion offline hasta su registro  

### Done ✓

- [x] cambiar metodo de busqueda en acciones  en fixed assets, botones con modall  
- [x] alerta de sincronizacion de datos, usar  mat-progres bar u bloquers las actividades, dejar solo , crear asset y request hasta cargar completamente: https://material.angular.io/components/progress-bar/overview  
- [x] eliminar de fixed-asset la carga de los assets  
- [x] plantilla de delete  : cambiar al nuevo metodo de busqueda  
- [x] plantilla de movecambiar al nuevo metodo de busqueda  
- [x] plantilla de update: cambiar al nuevo metodo de busqueda  
- [x] plantilla de details cambiar al nuevo metodo de busqueda  
- [x] registrar assets en cache  
- [x] registrar locations en cache  
- [x] registrar request en cache  
- [x] grabar request offline  
  - [x] assetsMoveService  
- [x] revisar los requests  
- [x] loader en login  
- [x] implementar ng-template para cargando y no encontrado  
- [x] poner "seleccione.." en crear  
  - [x] crear assetDelete  
  - [x] crear assetMove  
  - [x] assetsUpdateService  
  - [x] crear assetUpdate  
  - [x] assetsDeleteService  
  - [x] assetsDetailsService  
  - [x] crear assetDetails  
- [x] mostrar alerta de cuando este offline  
- [x] Alerta de activo fijo dado de baja: fixedasset.component.ts:51:  
- [x] alerta de codigo no encontrado e UPDATE, MOVE, DELETE  
- [x] Campo código RFID se debe mostrar siempre en la sección Datos Activo Fijo. Actualmente sólo se muestra al "Modificar" pero no se ve en las otras pestañas (Detalles, baja y trasladar)  Revisar AF 1300488-0  

