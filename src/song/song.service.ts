import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import * as mysql from "mysql2/promise";
import { count } from 'console';

@Injectable()
export class SongService {
  db:PrismaService

  constructor(db:PrismaService){
    this.db=db
  }

  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: createSongDto
    })
  }


  async findAll() {
    return await this.db.song.findMany();
  }

  async findFree(){
    return await this.db.song.findMany({
      where:{
        price:0
      }
    })
  }

  async findOne(id: number) {
    return await this.db.song.findUnique({
      where:{
        id:id
      }
    });
  }

  topArtist(limit:number){
    return this.db.song.findMany({
      orderBy:{
        rating:"desc"
      },
      take:limit
    })
  }

  popularArtists(){
    return this.db.song.groupBy({
      by: ['author'],
      _count: {
        author: true
      },
      orderBy:{
        _count:{
          author:"desc"
        }
      }
    })
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    try{
      return await this.db.song.update({
        where: {
          id:id
        },
        data:updateSongDto
      })
    }
    catch{
      return undefined;
    }
  }

  async remove(id: number) {
    try{
      return await this.db.song.delete({
        where:{
          id:id
        }
      })
    }
    catch{
      return undefined;
    }
  }
}
