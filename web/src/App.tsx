import { Github, FileVideo, Upload, Wand2 } from 'lucide-react'

import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";
import { Separator } from "./components/ui/separator";
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';

export function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center px-6 py-4 justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Desenvolvido com 💜 no NLW da Rocketseat</span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 pr-4 flex gap-6 max-h-full overflow-y-auto">
        <div className='flex flex-col gap-4 flex-1'>
          <div className="grid grid-row-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
            />
          </div>

          <p className='text-muted-foreground text-sm'>
            Lembre-se: Você pode utilizar a viariável <code className='text-violet-400'>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>

        <aside className="w-80 space-y-6 overflow-y-auto pr-2">
          <form className='space-y-6'>
            <label
              htmlFor="video"
              className='cursor-pointer flex flex-col items-center justify-center gap-2 border rounded-md aspect-video text-sm border-dashed text-muted-foreground hover:bg-primary/5 transition'
            >
              <FileVideo className='w-4 h-4' />
              Selecione um vídeo
            </label>
            <input type="file" name="video" id="video" accept="video/mp4" className="sr-only" />

            <Separator />

            <div className='space-y-2'>
              <Label htmlFor="transcription_prompt">Prompt da transcrição</Label>
              <Textarea
                id='transcription_prompt'
                className='h-20 leading-relaxed resize-none'
                placeholder="Inclua palavras-chaves mencionadas no vídeo separadas por (,)"
              />
            </div>

            <Button type='submit' className='w-full'>
              Carregar vídeo
              <Upload className='w-4 h-4 ml-2' />
            </Button>

          </form>

          <Separator />

          <form className='space-y-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='title'>Título do YouTube</SelectItem>
                  <SelectItem value='description'>Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Modelo</Label>
              <Select defaultValue='gpt3.5' disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className='text-muted-foreground italic text-xs block'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
              />

              <span className='text-muted-foreground italic text-xs block leading-relaxed'>
                Valores altos tendem a deixar o resultado mais criativo e com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button type='submit' className='w-full'>
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>

          </form>
        </aside>
      </main>
    </div>
  )
}
