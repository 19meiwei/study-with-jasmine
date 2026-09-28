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
        .order("created_at", { ascending: false });

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
        console.error("Cannot find #materialsGrid");
        return;
    }

    container.innerHTML = "";

    if (!materials || materials.length === 0) {

        container.innerHTML = `
            <div class="empty-materials">
                <h3>No materials yet</h3>
                <p>New learning materials are coming soon.</p>
            </div>
        `;

        return;
    }


    materials.forEach((material) => {

        const card = document.createElement("article");

        card.className = "material-card";

        const price = Number(material.price || 0);

        const priceText =
            price === 0
                ? "Free"
                : `$${price.toFixed(2)}`;


        card.innerHTML = `

            <div class="material-cover">

                ${
                    material.cover_path
    ? `<img
        src="${getCoverUrl(material.cover_path)}"
        alt="${material.title || "Study material"}"
      >`
                        : `<div class="material-cover-placeholder">
                            学
                           </div>`
                }

            </div>


            <div class="material-info">

                <div class="material-meta">

                    <span>
                        ${material.subject || "Learning Material"}
                    </span>

                    ${
                        material.course

                            ? `<span>
                                ${material.course}
                               </span>`

                            : ""
                    }

                </div>


                <h3>
                    ${material.title || "Untitled Material"}
                </h3>


                <p>
                    ${
                        material.description ||
                        "Study material from Study with Jasmine."
                    }
                </p>


                <div class="material-bottom">

                    <strong class="material-price">
                        ${priceText}
                    </strong>


                    <button
                        class="material-button"
                        data-id="${material.id}"
                    >

                        ${
                            price === 0
                                ? "View Material"
                                : "Get Material"
                        }

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

        button.addEventListener("click", () => {

            const materialId =
                button.dataset.id;

            console.log(
                "Selected material:",
                materialId
            );

            // Sau này mình sẽ nối:
            // login
            // payment
            // purchase verification
            // secure download

        });

    });

}


// ==========================================
// 6. START
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    loadMaterials
);