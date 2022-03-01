import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')  //swagger üzerinden users içeriklerini users başlığı altında yayınlamasını sağladık. 
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}    //constructor içerisinde yazdığımız şeyler genellikle arka planda bir bağlantı kurmak için yazılı bu da aynı şekilde users.service.ts içerisindeki UsersService ile bağlantı kuruyor.

    @ApiOkResponse({type: User, isArray: true})
    @ApiQuery({name: 'name', required: false}) //name search butonu için ApiQuery ile yazdığımız zaman butonu doldurmak zorunlu şekilde gelir. Biz burda required: false yazınca zorunluluğu kaldırıyoruz. Bu konuda 15. Satırda "name?"" yapmamız yeterli olmuyor. O yüzden required'ın false olduğunu özellikle belirtmemiz gerekti.
    @Get()
    getUsers(@Query('name') name?: string): User[] { //any yani rastgele datayı kullanmak yerine user.entity.ts adında bir dosya oluşturup içerisine name, id gibi bilgiler girerek orayı data olarak kullanıyoruz.
        return this.usersService.findAll(name);
    }

    @ApiOkResponse({ type: User, description: 'the user' })  //description: swagger'da bulunan description bölümü dolduruyoru. Yani bir açıklama eklememize yarıyor
    @ApiNotFoundResponse() //Detailsın solunda hata bilgisi yazmıyordu(Undocumented yazar). Ancak bu kodu yazarak 'Error: Not Found' un yanına '404' bastırdık. Bu şekilde kullanıcıyı bilgilendirmiş olduk.
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User { //User ve User[]'ları fonksiyonlara girmemizin sebebi her seferinde datayı döndürsün diye

        const user = this.usersService.findById(id);  //burada Number(id) yazmamızın sebebi bunu yazmadan önce ekrana "1" olarak geliyordu ancak onu yazarak direkt bize number veri tipinde dönmesini sağladık
        
        if(!user) {
            throw new NotFoundException();
        } //eğer user girilmediyse NotFoundException yani bulunamadı hatası döndür.

        return user;
    }

    @ApiCreatedResponse({ type: User })
    @ApiBadRequestResponse()
    @Post()
    createUser(@Body() body: CreateUserDto): User {  //create-user.dto.ts dosyasından CreateUserDto'yu import ettik bu dosyanın içinden de name'i aldık
        return this.usersService.createUser(body);
    }

}