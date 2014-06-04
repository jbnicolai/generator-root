class mysql {
# mysql
  $password = 'vagrant'

    package { "mysql-server":
      ensure => present,
      require => Exec["apt-get update"]
    }

  service { "mysql":
    ensure => running,
    require => Package["mysql-server"],
  }

  exec { "set-mysql-password":
    unless => "mysqladmin -uroot -p$password status",
    command => "mysqladmin -uroot password $password",
    require => Service["mysql"],
  }
}
