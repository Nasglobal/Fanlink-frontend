"use client"
import React,{useState,useEffect} from 'react'
import { FileUploader } from "react-drag-drop-files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from '../ui/textarea';
import { api } from '@/lib/api'
import { notify } from '@/lib/utils'
import axios from 'axios'
import Loading from '../ui/Loading'
import Image from 'next/image'
import Preview from './Preview'
import DisplayOrder from './DisplayOrder';
import EditableSelect from '../ui/EditableSelect';
import { useRouter } from 'next/navigation';

function CreateFanlink() {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileTypes = ["png", "jpg", "jpeg"];
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [loader, setLoader] = useState(false);
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);
    const [loadingTrack, setLoadingTrack] = useState(false);
    const router = useRouter()


  const handleChange = (value) => {
    setQuery(value);
  };
  
    const error = null

     // Fetch music tracks dynamically
  useEffect(() => {

    const fetchTracks = async (query) => {
      console.log("query",query)
      if (query?.length === 0) {
        setItems([]);
        return;
      }
      setLoadingTrack(true);
      try {
        const response = await axios.get(`${api}/search-tracks/`, {
          params: {query} ,
        });
        setItems(response?.data?.tracks) ; // Process the data as needed
        
        setLoadingTrack(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setLoadingTrack(false);
        setItems([]);
      }
    };

    const debounceTimeout = setTimeout(fetchTracks(query), 500); // Debounce API call
    return () => clearTimeout(debounceTimeout);
  }, [query]);


    const fanlinkSchema = z.object({
  
      description: z.string().min(2, {
        message: "Description is required",
      }),

      releaseDate: z.string().min(2, {
        message: "Release date is required",
      }),

      upc: z.string().min(2, {
        message: "UPC is required",
      }),
      source: z.string().min(2, {
        message: "Preview source is required",
      }),
      track_title: z.string().min(2, {
        message: "Track title is required",
      }),
      label: z.string().min(2, {
        message: "Label name is required",
      }),
    });
  
    const form = useForm({
      resolver: zodResolver(fanlinkSchema),
      defaultValues: {
        upc: "",
        description: "",
        releaseDate:"",
        track_title:"",
        source:"",
        label:""
      },
    });
  
  

    async function onSubmit(values) {

        if (!selectedArtist){
          notify("Artist not selected","fail")
          return
        }

          setLoader(true)
          const formData = new FormData();
          formData.append('artist', selectedArtist);
          formData.append('track', values.track_title);
          formData.append('upc', values.description);
          formData.append('description', values.upc);
          formData.append('releaseDate', values.releaseDate);
          formData.append('source', values.source);
          formData.append('label', values.label);
          formData.append('image', logo);
          try {
              const response = await axios.post(api + `/create-fanlink/create_fanlink/`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
  
              });
              if (response?.data){
               setLoader(false) 
               //setGeneratedLink(window.location.origin + response?.data?.link)
               notify("Fanlink generated successfuly","success")
               router.push("/dashboard/fanlinks")
              }
          } catch (error) {
              
              notify(error?.message,"fail")
              setLoader(false)
          }
      };

      const handleFileChange = (file) => {
        const imageFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          setLogoPreview(event.target.result);
        };
        reader.readAsDataURL(imageFile);
        setLogo(file);
      };

  return (
    <main className='m-5 text-white'>
      <div>
        <p className='text-2xl font-bold'>Creat your <span className='text-red-500'>Fanlink</span></p>
        <p className='text-xs  mt-2'>Fill all the neccessary information to generate your Fanlink</p>
      </div>
        <section className='grid md:grid-cols-2 mt-10  rounded-lg border w-full  gap-5 p-5'>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <EditableSelect
        placeholder="Search or edit artist"
        items={items}
        title="Artist"
        onChange={handleChange}
        selectedItem={selectedArtist}
        setSelectedItem={setSelectedArtist}
      />
        

    <FormField
            control={form.control}
            name="track_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Track title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter track title" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
         

      <FormField
            control={form.control}
            name="upc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPC</FormLabel>
                <FormControl>
                  <Input placeholder="Enter upc" type="number" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter label name" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

     <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Release date</FormLabel>
                <FormControl>
                  <Input placeholder="Enter release date" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />


          <FileUploader
                          handleChange={handleFileChange}
                          types={fileTypes}
                        >
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-white mt-10'>Image</p>
            {logoPreview ? 
          <Image
          src={logoPreview}
          alt="store logo"
          width={120}
          height={60}
          className=" object-cover"
          />:
          <Image
          src={`/assets/images/track-photo.png`}
          alt="store logo"
          width={120}
          height={60}
          className=" object-cover"
          />}
          
          <p className='text-xs text-green-500 underline'>Import image from URL</p>
         
          </div>

          </FileUploader>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />


<FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Preview source" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {source.map((item) => (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />


         <DisplayOrder/>
         
         <div className='flex justify-end'>
           
         <Button className='bg-red-600 flex items-center text-white py-3 px-6 text-sm rounded-xl'>
            {loader ? <><Loading/>Saving..</>:"Save changes"}
         </Button>
         
         </div>
         {/* {generatedLink && <div className='flex md:flex-row flex-col  text-center justify-center items-center text-xs rounded-md p-3 gap-3 text-white border bg-gray-100'>
            <p className='p-2 text-black rounded-md border border-red-500'>{generatedLink}</p>
            <div className='flex gap-2 py-2 px-5 bg-green-400 items-center rounded-full'>
            <CopyIcon/>
            copy link
            </div>
            </div>} */}

         </form>
         </Form>

        <Preview/>
        </section>
       
    </main>
  )
}

export default CreateFanlink

const artists = [
    "P-Square",
    "2Face Idibia",
    "HarrySong"
  ]

  const source = [
    "audiomack",
    "youtube",
    "sportify",
    "boomplay",
    "applemusic",
    "itunes",
    "deezer",
    "tidal",
    "amazon",
  ]
  
  const trackTitle = [
    "Alingo",
    "african queen",
    "Testify",
  ]

  