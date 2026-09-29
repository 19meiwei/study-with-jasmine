/* =========================================
   STUDY WITH JASMINE
   PROGRAM PAGE
========================================= */


const SUPABASE_URL =
    "https://eunvkjirdgovwgclqkcm.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_cvGGPzroACteZ2Y5bIYo8w_gUXkqtUV";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================
   PROGRAM INFORMATION
========================================= */

const PROGRAMS = {

    "Business Chinese": {
        icon: "商",
        chinese: "商务中文",
        title: "Business Chinese",
        description:
            "Practical Chinese for business communication, meetings, customers, negotiation and professional situations."
    },


    "Factory & Workplace Chinese": {
        icon: "工",
        chinese: "工厂与职场中文",
        title: "Factory & Workplace Chinese",
        description:
            "Practical Chinese vocabulary and communication for factories, manufacturing, production and workplace situations."
    },


    "Travel & Hospitality Chinese": {
        icon: "旅",
        chinese: "旅游与酒店中文",
        title: "Travel & Hospitality Chinese",
        description:
            "Useful Chinese for hotels, restaurants, tourism, customer service and everyday travel situations."
    },


    "YCT Chinese for Kids": {
        icon: "童",
        chinese: "少儿 YCT 中文",
        title: "YCT Chinese for Kids",
        description:
            "Fun and structured Chinese materials for young learners preparing for YCT and building everyday vocabulary."
    },


    "HSK 3.0": {
    icon: "汉语",
    chinese: "汉语水平考试",
    title: "HSK 3.0",
    description:
        "HSK 3.0 preparation materials organized by level, including vocabulary, textbooks, practice and exam resources."
}

};


/* =========================================
   CURRENT COURSE
========================================= */

const params =
    new URLSearchParams(window.location.search);

const currentCourse =
    params.get("course");


let programMaterials = [];


/* =========================================
   INITIALIZE PROGRAM
========================================= */

function initializeProgram() {

    if (!currentCourse) {

        showProgramError(
            "Program not found."
        );

        return;
    }


    const program =
        PROGRAMS[currentCourse];


    if (!program) {

        showProgramError(
            "This program does not exist."
        );

        return;
    }


    document.title =
        `${program.title} | Study with Jasmine`;


    document.getElementById(
        "programIcon"
    ).textContent =
        program.icon;


    document.getElementById(
        "programChineseTitle"
    ).textContent =
        program.chinese;


    document.getElementById(
        "programTitle"
    ).textContent =
        program.title;


    document.getElementById(
        "programDescription"
    ).textContent =
        program.description;


    loadProgramMaterials();

}


/* =========================================
   LOAD MATERIALS
========================================= */

async function loadProgramMaterials() {

    const grid =
        document.getElementById(
            "programMaterialsGrid"
        );


    const {
        data,
        error
    } = await supabaseClient

        .from("Materials")

        .select("*")

        .eq(
            "is_published",
            true
        )

        .eq(
            "course",
            currentCourse
        )

        .order(
            "created_at",
            {
                ascending: false
            }
        );


    if (error) {

        console.error(
            "Error loading program:",
            error
        );


        grid.innerHTML = `

            <div class="empty-state">

                <h3>
                    Could not load materials.
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

        return;

    }


    programMaterials =
        data || [];


    updateMaterialCount(
        programMaterials.length
    );


    displayMaterials(
        programMaterials
    );

}


/* =========================================
   MATERIAL COUNT
========================================= */

function updateMaterialCount(count) {

    const element =
        document.getElementById(
            "materialCount"
        );


    element.textContent =
        `${count} ${
            count === 1
                ? "Material"
                : "Materials"
        }`;

}


/* =========================================
   COVER URL
========================================= */

function getCoverUrl(
    coverPath
) {

    if (!coverPath) {
        return "";
    }


    const { data } =
        supabaseClient.storage

            .from(
                "material-covers"
            )

            .getPublicUrl(
                coverPath.trim()
            );


    return data.publicUrl;

}


/* =========================================
   FILE URL
========================================= */

function getMaterialUrl(
    filePath
) {

    if (!filePath) {
        return "";
    }


    const { data } =
        supabaseClient.storage

            .from(
                "material-files"
            )

            .getPublicUrl(
                filePath.trim()
            );


    return data.publicUrl;

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================
   PRICE
========================================= */

function formatPrice(price) {

    const number =
        Number(price || 0);


    if (number === 0) {
        return "Free";
    }


    return `$${number.toFixed(2)}`;

}


/* =========================================
   DISPLAY MATERIALS
========================================= */

function displayMaterials(
    materials
) {

    const grid =
        document.getElementById(
            "programMaterialsGrid"
        );


    if (!materials.length) {

        grid.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    学
                </div>

                <h3>
                    No materials yet.
                </h3>

                <p>
                    New learning materials
                    will be added here soon.
                </p>

            </div>

        `;

        return;

    }


    grid.innerHTML =
        materials

            .map(
                material => {

                    const coverUrl =
                        getCoverUrl(
                            material.cover_path
                        );


                    const price =
                        Number(
                            material.price || 0
                        );


                    return `

                        <article
                            class="material-card"
                        >

                            <div
                                class="material-cover"
                            >

                                ${
                                    coverUrl

                                        ? `

                                            <img
                                                src="${coverUrl}"
                                                alt="${escapeHTML(
                                                    material.title
                                                )}"
                                            >

                                        `

                                        : `

                                            <div
                                                class="material-cover-placeholder"
                                            >
                                                学
                                            </div>

                                        `
                                }

                            </div>


                            <div
                                class="material-info"
                            >

                                <div
                                    class="material-meta"
                                >

                                    <span>
                                        ${escapeHTML(
                                            material.subject
                                        )}
                                    </span>

                                    <span>
                                        ${escapeHTML(
                                            material.course
                                        )}
                                    </span>

                                </div>


                                <h3>

                                    ${escapeHTML(
                                        material.title
                                    )}

                                </h3>


                                <p>

                                    ${escapeHTML(
                                        material.description
                                    )}

                                </p>


                                <div
                                    class="material-bottom"
                                >

                                    <strong
                                        class="material-price"
                                    >

                                        ${formatPrice(
                                            price
                                        )}

                                    </strong>


                                    <button
                                        class="material-button"
                                        type="button"
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

                        </article>

                    `;

                }

            )

            .join("");


    addMaterialButtonEvents();

}


/* =========================================
   MATERIAL BUTTON
========================================= */

function addMaterialButtonEvents() {

    const buttons =
        document.querySelectorAll(
            ".material-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const materialId =
                        button.dataset.id;


                    const material =
                        programMaterials.find(
                            item =>
                                String(item.id) ===
                                String(materialId)
                        );


                    if (!material) {
                        return;
                    }


                    const price =
                        Number(
                            material.price || 0
                        );


                    /*
                       FREE MATERIAL
                    */

                    if (price === 0) {

                        const fileUrl =
                            getMaterialUrl(
                                material.file_path
                            );


                        if (!fileUrl) {

                            alert(
                                "Material file not found."
                            );

                            return;

                        }


                        window.open(
                            fileUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );


                        return;

                    }


                    /*
                       PAID MATERIAL

                       Payment system will be
                       connected here later.
                    */

                    alert(
                        "Purchase system coming soon."
                    );

                }
            );

        }
    );

}


/* =========================================
   SEARCH
========================================= */

function setupSearch() {

    const search =
        document.getElementById(
            "programSearch"
        );


    search.addEventListener(
        "input",
        () => {

            const query =
                search.value

                    .trim()

                    .toLowerCase();


            if (!query) {

                displayMaterials(
                    programMaterials
                );

                return;

            }


            const filtered =
                programMaterials.filter(
                    material => {

                        const searchable =
                            `

                                ${material.title || ""}

                                ${material.description || ""}

                                ${material.subject || ""}

                                ${material.course || ""}

                            `

                            .toLowerCase();


                        return searchable.includes(
                            query
                        );

                    }
                );


            displayMaterials(
                filtered
            );

        }
    );

}


/* =========================================
   ERROR
========================================= */

function showProgramError(
    message
) {

    document.getElementById(
        "programTitle"
    ).textContent =
        "Program Not Found";


    document.getElementById(
        "programDescription"
    ).textContent =
        message;


    document.getElementById(
        "materialCount"
    ).textContent =
        "0 Materials";


    document.getElementById(
        "programMaterialsGrid"
    ).innerHTML = `

        <div class="empty-state">

            <h3>
                Program not found.
            </h3>

            <p>
                Return to the Material Library
                and choose another program.
            </p>

        </div>

    `;

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeProgram();

        setupSearch();

    }
);