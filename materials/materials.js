// ==========================================
// STUDY WITH JASMINE - MATERIAL LIBRARY
// ==========================================

// 1. SUPABASE INFORMATION
const SUPABASE_URL = "https://eunvkjirdgovwgclqkcm.supabase.co";

// Dán Publishable Key của m vào giữa dấu ""
const SUPABASE_KEY = "sb_publishable_cvGGPzroACteZ2Y5bIYo8w_gUXkqtUV";


// ==========================================
// 2. CONNECT TO SUPABASE
// ==========================================

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================================
// 3. GET MATERIALS FROM DATABASE
// ==========================================

async function loadMaterials() {

    console.log("Loading materials...");

    const { data, error } = await supabaseClient
        .from("Materials")
        .select("*")
.eq("is_published", true)
.order("course")

    if (error) {
        console.error("Error loading materials:", error);
        return;
    }

    console.log("Materials from Supabase:", data);

    displayMaterials(data);
}

function getCoverUrl(coverPath) {

    if (!coverPath) {
        return "";
    }

    const { data } = supabaseClient.storage
        .from("material-covers")
        .getPublicUrl(coverPath);

    return data.publicUrl;
}
// ==========================================
// 4. DISPLAY MATERIALS ON WEBSITE
// ==========================================

function displayMaterials(materials) {

    const container = document.getElementById("materialsGrid");

    if (!container) {
        console.error("Cannot find materialsGrid");
        return;
    }


    container.innerHTML = "";


    materials.forEach((material)=>{


        const coverURL = getCoverUrl(
            material.cover_path
        );


        const card = document.createElement("article");

        card.className = "material-card";


        card.innerHTML = `

        <img 
        src="${coverURL}" 
        class="material-image"
        >


        <div class="material-card-content">


        <span class="material-tag">
        ${material.course}
        </span>


        <h3>
        ${material.title}
        </h3>


        <p>
        ${material.description}
        </p>



        <div class="material-footer">

        <strong>
        ${Number(material.price) === 0 
        ? "Free" 
        : "$"+material.price}
        </strong>


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

// ==========================================
// 5. MATERIAL BUTTONS
// ==========================================

function addMaterialButtonEvents() {

    const buttons =
        document.querySelectorAll(".material-button");


    buttons.forEach((button) => {


        button.addEventListener(
            "click",
            async () => {


                const materialId =
                button.dataset.id;


                const { data, error } =
                await supabaseClient
                .from("Materials")
                .select("file_path")
                .eq(
                    "id",
                    materialId
                )
                .single();



                if(error){

                    console.error(error);

                    alert(
                    "Cannot open material."
                    );

                    return;

                }




                if(!data.file_path){

                    alert(
                    "No file attached."
                    );

                    return;

                }





     const { data: urlData } =
supabaseClient
.storage
.from("material-files")
.getPublicUrl(
    data.file_path
);


window.open(
    urlData.publicUrl,
    "_blank"
);



window.open(
    urlData.signedUrl,
    "_blank"
);

            }
        );


    });

}


// ==========================================
// 6. START
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadMaterials
);