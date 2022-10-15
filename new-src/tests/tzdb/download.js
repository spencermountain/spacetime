import sh from 'shelljs'

sh.exec(`wget -qO- https://timezonedb.com/files/TimeZoneDB.csv.zip | bsdtar -xvf-`)
sh.exec(`rm database.sql`)
sh.rm(`readme.txt`)
sh.rm(`country.csv`)
sh.mv(`time_zone.csv`, './plugins/dst/tzdb')