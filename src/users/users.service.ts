import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [{ id: 0, name: 'Enes'}, { id: 1, name: 'Enes'}, { id: 2, name: 'Dustin'}];

    findAll(name?: string): User[] { //findAll = bütün users verilerini tarayıp döndürecek. User[] yazmamızın sebebi bize User içindeki dataları döndürmesini istiyoruz.
        if (name) {
            return this.users.filter(user => user.name === name); //Isim arama sorgusu için şart bloğu(ApiQuery)
        }
        return this.users;
    }

    findById(userId: number): User {  //number type'ında bir userId istedik
        return this.users.find(user => user.id === userId); //kullanıcıyı gireceği userId'ye göre sıralayacağız. Girilen usersId users içinde aranacak ve bulunduğunda eşleştirilecek.
    }
    //Yukarıda UsersService içerisinde yazdığımız users'ı bir data olarak kullandık ve içerisine id ve name atadık
    //daha sonra aşağıda findById fonksiyonun içinde id'ye göre sıralama sistemi yazdık. ilk başta parantez
    //içerisinde datadan gelen id'yi user ile eşleştirip user'ı ise users içerisinde arayıp, kullanıcıdan aldığımız
    //id ile eşleştirip aynı id ise ekrana bastırıyor.

    createUser(createUserDto: CreateUserDto): User {
        const newUser = {id: Date.now(), ...createUserDto};

        this.users.push(newUser); //yaratılan yeni kullanıcıyı users içerisine şutladık

        return newUser; //yaratılan yeni kullanıcıyı geri dönderdik
    }
}
