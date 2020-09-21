export const modal = (content) => ({

    render: async () => {
        let view =  /*html*/`
            <div id="modal-content" class="modal-style">${await content.render()}</div>
        `
        return view;
    },
    after_render: async () => {
        await content.after_render();
        const modalContent = document.getElementById("modal-content");
        const modal = document.getElementById("root-modal")
        modalContent.addEventListener("click", (event) => {
            if (event.target.id == "modal-content") {
                modal.removeChild(modalContent)
            }
        });
    }
})

export default modal