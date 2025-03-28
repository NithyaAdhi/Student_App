﻿// Models/LoginDto.cs
using System.ComponentModel.DataAnnotations;

namespace StudentApi.Models
{
    public class LoginDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}