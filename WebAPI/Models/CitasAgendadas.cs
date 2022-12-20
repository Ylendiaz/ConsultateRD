﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class CitasAgendadas
    {
        public int CitaId { get; set; }
        public DateTime? CitaFecha { get; set; }
        public string CitasHoraInicio { get; set; }
        public string CitaHoraCierre { get; set; }
        public int CentroMedicoId { get; set; }
        public int PacienteId { get; set; }
        public int DoctorId { get; set; }
        public bool? EstadoCitas { get; set; }
        public DateTime? FechaCreacionCita { get; set; }
        public DateTime? FechaModificacionCita { get; set; }

        public virtual CentroMedico CentroMedico { get; set; }
        public virtual UsuarioDoctor Doctor { get; set; }
        public virtual UsuarioPaciente Paciente { get; set; }
    }
}