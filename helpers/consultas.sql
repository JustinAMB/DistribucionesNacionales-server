-- 17 Feb
select * from usuarios where id = 1;
        






-- 18
select REPARACIONES.IdReparacion,REPARACIONES.Matricula,REPARACIONES.FechaSalida,FACTURAS.IdFactura,FACTURAS.FechaFactura,CLIENTES.DNI,CLIENTES.Nombre,sum(Realizan.Horas) as horas  from REPARACIONES  
inner join FACTURAS on REPARACIONES.IdReparacion = FACTURAS.IdReparacion
inner join CLIENTES on FACTURAS.CodCliente = CLIENTES.CodCliente
inner join Realizan on Realizan.IdReparacion = REPARACIONES.IdReparacion
inner join ACTUACIONES on ACTUACIONES.Referencia = Realizan.Referencia
where REPARACIONES.IdReparacion = 1;