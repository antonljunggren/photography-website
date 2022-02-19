import { Component, createSignal, For, Show } from 'solid-js';

const App: Component = () => {

  const [showImageModal, setShowImageModal] = createSignal(false);
  const [imagesData, setImagesData] = createSignal([]);

  type ImageData = {
    Description:string,
    Footage_Data:string,
    Image_Hd:string,
    Image_Sd:string
  }

  //const apiUrl = "https://photoapiantonlj.azure-api.net";
  const blobUrl = "https://phtostorageantonlj.blob.core.windows.net/photographs"

  const listOfImages =[
    "forsater.png",
    "forsatertomte.png",
    "MajaBW3.png",
    "Taklampa.png"
  ];

  var imageToShow: ImageData = null;

  const fetchImagesData = () => {
    fetch(blobUrl + '/images.json')
      .then(res => {
        if(res.ok) {
          var data = res.json();
          return data;
        }
      })
      .then(data => {
        setImagesData(data['Images']);
      });
  }

  fetchImagesData();

  return (
    //<p class="text-4xl text-green-700 text-center py-20">Hello world!</p>
    <main class='bg-white w-full px-4'>
      <div class='text-center py-4'>
        <p class='text-center text-5xl'>Anton Ljunggren</p>
        <p class='text-center text-3xl py-1'>Film Photography</p>
      </div>
      <div class='md:w-9/12 mx-auto py-4 flex flex-row justify-between items-center flex-wrap'>
        <For each={imagesData()} fallback={<p>Loading ...</p>}>
          {(image : ImageData)=> 
          <img src={blobUrl+'/'+ image.Image_Sd} class='p-1 hover:p-2 hover:shadow-2xl grow' 
            onclick={(e) => { /*imageToShow = image; setShowImageModal(true);*/e.preventDefault();}}/>
          }
        </For>
      </div>

      <footer>
        <p class='text-center'>© Anton Ljunggren - 2022</p>
      </footer>

      <Show when={showImageModal()} fallback={<div/>}>
        <div class='fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50' style='max-height: 80%'>
          <div class='relative mx-auto w-auto max-w-100 bg-white'>
            <div class='flex justify-end'>
              <svg class="w-10 h-10" fill="none" stroke="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
                 onclick={(e) => setShowImageModal(false)}>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div class='bg-white w-full shadow-2xl'>
              <img src={blobUrl+'/'+imageToShow.Image_Hd} alt='Loading ...' class='mx-auto' style='width:90%'/>
              <p class='text-center text-xl'>{imageToShow.Description}</p>
            </div>
          </div>
        </div>
        <div class='fixed z-40 inset-0 opacity-70 bg-black overflow-y-scroll'>
        </div>
      </Show>
    </main>
  );
};

export default App;
