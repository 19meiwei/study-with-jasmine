// ==========================================
// STUDY WITH JASMINE - MATERIAL LIBRARY
// ==========================================


const SUPABASE_URL =
"https://eunvkjirdgovwgclqkcm.supabase.co";


const SUPABASE_KEY =
"sb_publishable_cvGGPzroACteZ2Y5bIYo8w_gUXkqtUV";


const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);



let allMaterials = [];



// LOAD DATA

async function loadMaterials(){


    const {data,error} =
    await supabaseClient
    .from("Materials")
    .select("*")
    .eq("is_published",true)
    .order("created_at",
    {
        ascending:false
    });



    if(error){

console.log("Materials from Supabase:", data);

// lưu dữ liệu lại để dùng khi click category
allMaterials = data;

// lúc mở trang không hiện tài liệu
const container = document.getElementById("materialsGrid");

if (container) {
    container.innerHTML = "";
}

setupCategoryFilter();
function setupCategoryFilter(){

    const buttons = document.querySelectorAll(".program-card");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const course = button.dataset.course;

            const filtered = allMaterials.filter(
                material => material.course === course
            );

            displayMaterials(filtered);

        });

    });

}

}





// IMAGE

function getCoverUrl(path){


    if(!path)
        return "";


    const {data} =
    supabaseClient.storage
    .from("material-covers")
    .getPublicUrl(path);


    return data.publicUrl;

}






// DISPLAY

function displayMaterials(materials){


    const container =
    document.getElementById(
        "materialsGrid"
    );


    if(!container)
        return;



    container.innerHTML="";



    materials.forEach(material=>{


        const card =
        document.createElement(
            "article"
        );


        card.className =
        "material-card";



        card.innerHTML = `


        <img 
        src="${getCoverUrl(material.cover_path)}"
        class="material-image">


        <div class="material-card-content">


        <span class="tag">
        ${material.subject}
        </span>


        <span class="tag">
        ${material.course}
        </span>


        <h3>
        ${material.title}
        </h3>


        <p>
        ${material.description}
        </p>


        <div class="price-area">


        <div class="price">
        ${Number(material.price)==0
        ?"Free"
        :"$"+material.price}
        </div>


        <button
        class="material-button"
        data-id="${material.id}">
        View Material
        </button>


        </div>


        </div>


        `;



        container.appendChild(card);



    });



    addMaterialButtonEvents();


}








// CATEGORY BUTTON

function setupCategoryFilter(){


    const buttons =
    document.querySelectorAll(
        ".category-btn"
    );


    buttons.forEach(button=>{


        button.addEventListener(
        "click",
        ()=>{


            const category =
            button.dataset.course;



            if(category==="all"){

                displayMaterials(
                    allMaterials
                );

            }
            else{


                const filtered =
                allMaterials.filter(
                    item =>
                    item.course === category
                );


                displayMaterials(
                    filtered
                );


            }



        });


    });



}






// OPEN FILE

function addMaterialButtonEvents(){


const buttons =
document.querySelectorAll(
".material-button"
);



buttons.forEach(button=>{


button.onclick = async()=>{


const id =
button.dataset.id;



const {data,error} =
await supabaseClient
.from("Materials")
.select("file_path")
.eq("id",id)
.single();



if(error){
console.error(error);
return;
}



const {data:urlData} =
supabaseClient.storage
.from("material-files")
.getPublicUrl(
data.file_path
);



window.open(
urlData.publicUrl,
"_blank"
);



};


});


}


document.addEventListener(
"DOMContentLoaded",
loadMaterials
);