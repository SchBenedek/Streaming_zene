import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import * as mysql from "mysql2/promise";

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

  async findOne(id: number) {
    return await this.db.song.findUnique({
      where:{
        id:id
      }
    });
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
