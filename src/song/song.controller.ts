import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get("free")
  async findFree() {
    const songs=await this.songService.findAll();
    const freeSongs=[];
    songs.forEach(s=>{
      if(s.price==0){
        freeSongs.push(s);
      }
      else{
        undefined;
      }
    })
    return freeSongs;
  }

  @Get("top")
  async findTop(@Query("limit") limit:number) {
    const songs=await this.songService.findAll();
    if(!limit){
      limit=10;
    }
    songs.sort((a,b)=>b.rating-a.rating);
    const tops=songs.slice(0,limit);
    return tops;
  }

  @Get("topArtist")
  async findTopArtists(){
    return await this.songService.topArtist(); 
  }

  @Post()
  async create(@Body() createSongDto: CreateSongDto) {
    return await this.songService.create(createSongDto);
  }

  @Get()
  async findAll() {
    return await this.songService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const song = await this.songService.findOne(+id);
    if(!song){
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    else{
      return song;
    }
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return await this.songService.update(+id, updateSongDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const success=await this.songService.remove(+id);
    if(!success){
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return;
  }
}
