class apache {
  package { "apache2":
    ensure => present,
    require => Exec["apt-get update"],
  }
  file { "/etc/apache2/mods-enabled/rewrite.load":
    ensure => link,
    target => "/etc/apache2/mods-available/rewrite.load",
    require => Package["apache2"]
  }
  file { '/etc/apache2/sites-available/default':
    ensure  => file,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    source  => '/vagrant/files/etc/apache2/sites-available/default',
    require => Package['apache2'],
  }
  service { "apache2":
    ensure => "running",
    require => Package["apache2"],
    subscribe => [
      File["/etc/apache2/mods-enabled/rewrite.load"],
      File["/etc/apache2/sites-available/default"]
    ],
  }
}
