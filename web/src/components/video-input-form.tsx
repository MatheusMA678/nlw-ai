import { useMemo, useRef, useState } from "react";
import { FileVideo, Upload } from "lucide-react";
import { fetchFile } from '@ffmpeg/util'
import { getFFmpeg } from "@/lib/ffmpeg";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const promptInputRef = useRef<HTMLTextAreaElement | null>(null)

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert started.')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', (progress) => {
      console.log("Convert progress: " + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
      type: 'audio/mpeg'
    })

    console.log('Convert finished.')

    return audioFile
  }

  async function handleUploadVideo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if (!videoFile) {
      return
    }

    const audioFile = await convertVideoToAudio(videoFile)

    console.log(audioFile)
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form onSubmit={handleUploadVideo} className='space-y-6'>
      <label
        htmlFor="video"
        className='relative overflow-hidden cursor-pointer flex flex-col items-center justify-center gap-2 border rounded-md aspect-video text-sm border-dashed text-muted-foreground hover:bg-primary/5 transition'
      >
        {previewUrl ? (
          <video src={previewUrl} controls={false} className="pointer-events-none absolute inset-0 object-center scale-105 w-full h-full"></video>
        ) : (
          <>
            <FileVideo className='w-4 h-4' />
            Selecione um vídeo
          </>
        )}
      </label>
      <input type="file" name="video" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

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
  )
}
