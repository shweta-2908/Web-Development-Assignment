const infoIconSvg = `
<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="11" fill="white"/>
<path d="M9.752 16L9.656 15.376C10.1787 15.2693 10.4933 15.1627 10.6 15.056C10.7173 14.9387 10.776 14.7413 10.776 14.464V9.872C10.776 9.648 10.6907 9.488 10.52 9.392C10.3493 9.28533 10.0293 9.184 9.56 9.088L9.656 8.576C10.7973 8.42667 11.592 8.352 12.04 8.352L12.216 8.512V14.848C12.216 14.976 12.2427 15.0613 12.296 15.104C12.36 15.136 12.44 15.1627 12.536 15.184L13.32 15.376L13.256 16H9.752ZM12.232 5.504C12.232 5.77067 12.1467 5.99467 11.976 6.176C11.816 6.35733 11.5973 6.448 11.32 6.448C11.0533 6.448 10.8293 6.368 10.648 6.208C10.4773 6.048 10.392 5.82933 10.392 5.552C10.392 5.264 10.472 5.03467 10.632 4.864C10.8027 4.69333 11.032 4.608 11.32 4.608C11.928 4.608 12.232 4.90667 12.232 5.504Z" fill="black"/>
</svg>`;

document.addEventListener("DOMContentLoaded", async () => {
  const assetContainer = document.getElementById("assetContainer");
  const journeyList = document.getElementById("journeyList");

  try {
    const response = await fetch("data.json");
    const data = await response.json();

    const assets = data.tasks[0].assets;

    assets.forEach((asset) => {
      const li = document.createElement("li");
      li.textContent = asset.asset_title;
      journeyList.appendChild(li);
    });

    assets.forEach((asset) => {
      renderAsset(asset, assetContainer);
    });
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
});
function renderAsset(asset, container) {
  const card = document.createElement("div");
  card.className = "card";

  let content = `
    <div class="card-header" style="background:black; color:white; padding:12px; display:flex; justify-content:space-between; align-items:center;">
      <span style = "align-item:center;">${asset.asset_title}</span>
      ${infoIconSvg}
    </div>
    <div class="card-body">
      <p>${asset.asset_description || ""}</p>
  `;

  if (asset.asset_content_type === "video") {
    content += `
      <iframe 
        src="${asset.asset_content.trim()}" 
        width="100%" 
        height="250" 
        frameborder="0" 
        allowfullscreen>
      </iframe>`;
  }

  if (asset.asset_content_type === "threadbuilder") {
    content += `
      <div class="thread" style="display: flex; align-items: center; gap: 60px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1003 9.6001L7.98895 3.66642L1.87761 9.6001L0 7.77334L7.98895 9.72748e-05L15.9779 7.77334L14.1003 9.6001Z" fill="black"/>
                <path d="M15.9062 7.77393L7.98828 0.0698242L0.0712891 7.77393L1.87695 9.53076L7.9541 3.63037L7.98926 3.59717L8.02344 3.63037L14.0996 9.53076L15.9062 7.77393Z" stroke="black" stroke-opacity="0.4" stroke-width="0.1"/>
            </svg>
            <p>Thread A</p>
        </div>
        <div style="display:flex; gap:20px; margin-bottom:20px; padding-left: 20px; padding-right: 20px;">
            <div class="threadbox" style="flex:1;"><label class="input-section">Sub thread 1</label> <textarea class="typetext" placeholder="Enter Text here"></textarea></div>
            <div class="threadbox" style="flex:1;"><label class="input-section">Sub Interpretation 1</label><textarea class="typetext" placeholder="Enter Text here"></textarea></div>
        </div>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 15px; padding-right: 20px; margin-bottom: 15px;">
            <svg width="118" height="20" viewBox="0 0 118 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.2236 19C4.2236 19.5 4.64596 20 5.2795 20H9.50311C10.1366 20 10.559 19.5 10.559 19V18H4.2236V19ZM7.3913 0C3.27329 0 0 3.1 0 7C0 9.4 1.26708 11.5 3.1677 12.7V15C3.1677 15.5 3.59006 16 4.2236 16H10.559C11.1925 16 11.6149 15.5 11.6149 15V12.7C13.5155 11.4 14.7826 9.3 14.7826 7C14.7826 3.1 11.5093 0 7.3913 0Z" fill="#323232"/><path d="M49.7727 2C49.7727 0.9 48.8382 0 47.6832 0H30.8832C29.7282 0 28.7832 0.9 28.7832 2V14C28.7832 15.1 29.7282 16 30.8832 16H45.5832L49.7832 20L49.7727 2ZM45.5832 12H32.9832V10H45.5832V12ZM45.5832 9H32.9832V7H45.5832V9ZM45.5832 6H32.9832V4H45.5832V6Z" fill="#323232"/><path d="M82.4499 0H66.1165C64.8215 0 63.7832 0.857143 63.7832 1.90476V15.2381C63.7832 16.2857 64.8215 17.1429 66.1165 17.1429H70.7832L74.2832 20L77.7832 17.1429H82.4499C83.7332 17.1429 84.7832 16.2857 84.7832 15.2381V1.90476C84.7832 0.857143 83.7332 0 82.4499 0ZM75.4499 15.2381H73.1165V13.3333H75.4499V15.2381ZM77.8649 7.85714L76.8148 8.73338C75.9748 9.42861 75.4499 10 75.4499 11.4286H73.1165V10.9524C73.1165 9.90476 73.6414 8.95242 74.4814 8.25718L75.9281 7.05718C76.3598 6.71432 76.6165 6.2381 76.6165 5.71429C76.6165 4.66667 75.5665 3.80952 74.2832 3.80952C72.9999 3.80952 71.9499 4.66667 71.9499 5.71429H69.6165C69.6165 3.60952 71.7049 1.90476 74.2832 1.90476C76.8615 1.90476 78.9499 3.60952 78.9499 5.71429C78.9499 6.55238 78.5299 7.31429 77.8649 7.85714Z" fill="#323232"/><path d="M111.404 7.867C111.236 5.356 110.179 2.908 108.195 1C106.193 2.926 105.089 5.374 104.874 7.867C106.071 8.479 107.175 9.27101 108.139 10.234C109.103 9.28001 110.207 8.488 111.404 7.867ZM105.323 10.252C105.192 10.162 105.042 10.081 104.902 9.99099C105.042 10.09 105.192 10.162 105.323 10.252ZM111.329 10.027C111.208 10.108 111.077 10.171 110.955 10.261C111.077 10.171 111.208 10.108 111.329 10.027ZM108.139 13.105C106.128 10.153 102.694 8.2 98.7832 8.2C98.7832 12.988 101.927 17.038 106.296 18.541C106.885 18.748 107.503 18.901 108.139 19C108.775 18.892 109.384 18.739 109.982 18.541C114.351 17.038 117.495 12.988 117.495 8.2C113.584 8.2 110.15 10.153 108.139 13.105Z" fill="#323232"/></svg>
            <select style="padding: 5px; border-radius: 5px; border: 1px solid #ccc; font-size: 10px; font-weight:600;"><option>Select Categ</option></select>
            <select style="padding: 5px; border-radius: 5px; border: 1px solid #ccc; font-size: 10px; font-weight:600;"><option>Select Process</option></select>
        </div>
        <button class="sub-thread-btn">+ Sub-thread</button>
        <div class="threadbox"><label class="input-section">Summary for Thread A</label><textarea class="typetext" placeholder="Enter Text here"></textarea></div>`;
  }

  if (
    asset.asset_content_type === "article" &&
    asset.asset_type === "input_asset"
  ) {
    content += `
    <div class="input-container" style="padding: 10px;">
            <label style="font-weight: 600; display: block; margin-bottom: 5px; font-size: 16px;">Title</label>
            <input type="text" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.10); margin-bottom: 20px;">
            
            <label style="font-weight: 600; display: block; margin-bottom: 5px; font-size: 16px;">Content</label>
            
            <div class ="structurebox" style="border: 1px solid #ddd; border-radius: 5px 5px 0 0; box-shadow: 0 4px 8px rgba(0,0,0,0.10); overflow: hidden;">
                
                <div class="editor-toolbar" style="display: flex; gap: 15px; background: #fcfcfc; padding: 10px 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.10)">
                    <span style="font-size: 12px; color: #666; cursor: pointer;">File</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">Edit</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">View</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">Insert</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">Format</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">Tools</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">Table</span>
                    <span style="font-size: 12px; color: #666; cursor: pointer;">Help</span>
                </div>

                <div style="display: flex; align-items: center; gap: 20px; background: #fcfcfc; padding: 8px 15px; ">
                    <span style="cursor: pointer; display: flex;">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.64976 0.999951L1 4.98546M1 4.98546L5.64976 8.97097M1 4.98546L11.7 4.98546C13.9091 4.98546 15.7 6.77632 15.7 8.98546L15.7 12.7" stroke="#616161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                    <span style="cursor: pointer; display: flex;">
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0931 1.0001L14.3 5.20702M14.3 5.20702L10.0931 9.41395M14.3 5.20702H5C2.79086 5.20702 0.999996 6.99788 0.999996 9.20702V13.3501" stroke="#616161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                    <span style="cursor: pointer; display: flex;">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.696 1H16.1995M16.1995 1V6.50345M16.1995 1L10.6961 6.50345M6.50395 16.2H1.0005M1.0005 16.2V10.6965M1.0005 16.2L6.7005 10.5M16.2 10.696V16.1995M16.2 16.1995H10.6965M16.2 16.1995L10.6965 10.6961M1 6.50395L1 1.0005M1 1.0005L6.50345 1.0005M1 1.0005L6.7 6.7005" stroke="#616161" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                    <span style="cursor: pointer; display: flex;">
                        <svg width="102" height="18" viewBox="0 0 102 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="102" height="18" fill="#EBEBEB"/><path d="M9.516 8.084C9.516 8.78 9.276 9.36 8.796 9.824C8.324 10.28 7.6 10.508 6.624 10.508H5.016V14H3.924V5.636H6.624C7.568 5.636 8.284 5.864 8.772 6.32C9.268 6.776 9.516 7.364 9.516 8.084ZM6.624 9.608C7.232 9.608 7.68 9.476 7.968 9.212C8.256 8.948 8.4 8.572 8.4 8.084C8.4 7.052 7.808 6.536 6.624 6.536H5.016V9.608H6.624ZM10.7052 10.688C10.7052 10.016 10.8412 9.428 11.1132 8.924C11.3852 8.412 11.7572 8.016 12.2292 7.736C12.7092 7.456 13.2412 7.316 13.8252 7.316C14.4012 7.316 14.9012 7.44 15.3252 7.688C15.7492 7.936 16.0652 8.248 16.2732 8.624V7.424H17.3772V14H16.2732V12.776C16.0572 13.16 15.7332 13.48 15.3012 13.736C14.8772 13.984 14.3812 14.108 13.8132 14.108C13.2292 14.108 12.7012 13.964 12.2292 13.676C11.7572 13.388 11.3852 12.984 11.1132 12.464C10.8412 11.944 10.7052 11.352 10.7052 10.688ZM16.2732 10.7C16.2732 10.204 16.1732 9.772 15.9732 9.404C15.7732 9.036 15.5012 8.756 15.1572 8.564C14.8212 8.364 14.4492 8.264 14.0412 8.264C13.6332 8.264 13.2612 8.36 12.9252 8.552C12.5892 8.744 12.3212 9.024 12.1212 9.392C11.9212 9.76 11.8212 10.192 11.8212 10.688C11.8212 11.192 11.9212 11.632 12.1212 12.008C12.3212 12.376 12.5892 12.66 12.9252 12.86C13.2612 13.052 13.6332 13.148 14.0412 13.148C14.4492 13.148 14.8212 13.052 15.1572 12.86C15.5012 12.66 15.7732 12.376 15.9732 12.008C16.1732 11.632 16.2732 11.196 16.2732 10.7ZM20.5546 8.492C20.7466 8.116 21.0186 7.824 21.3706 7.616C21.7306 7.408 22.1666 7.304 22.6786 7.304V8.432H22.3906C21.1666 8.432 20.5546 9.096 20.5546 10.424V14H19.4626V7.424H20.5546V8.492ZM23.7712 10.688C23.7712 10.016 23.9072 9.428 24.1792 8.924C24.4512 8.412 24.8232 8.016 25.2952 7.736C25.7752 7.456 26.3072 7.316 26.8912 7.316C27.4672 7.316 27.9672 7.44 28.3912 7.688C28.8152 7.936 29.1312 8.248 29.3392 8.624V7.424H30.4432V14H29.3392V12.776C29.1232 13.16 28.7992 13.48 28.3672 13.736C27.9432 13.984 27.4472 14.108 26.8792 14.108C26.2952 14.108 25.7672 13.964 25.2952 13.676C24.8232 13.388 24.4512 12.984 24.1792 12.464C23.9072 11.944 23.7712 11.352 23.7712 10.688ZM29.3392 10.7C29.3392 10.204 29.2392 9.772 29.0392 9.404C28.8392 9.036 28.5672 8.756 28.2232 8.564C27.8872 8.364 27.5152 8.264 27.1072 8.264C26.6992 8.264 26.3272 8.36 25.9912 8.552C25.6552 8.744 25.3872 9.024 25.1872 9.392C24.9872 9.76 24.8872 10.192 24.8872 10.688C24.8872 11.192 24.9872 11.632 25.1872 12.008C25.3872 12.376 25.6552 12.66 25.9912 12.86C26.3272 13.052 26.6992 13.148 27.1072 13.148C27.5152 13.148 27.8872 13.052 28.2232 12.86C28.5672 12.66 28.8392 12.376 29.0392 12.008C29.2392 11.632 29.3392 11.196 29.3392 10.7ZM35.2405 7.316C35.8085 7.316 36.3045 7.44 36.7285 7.688C37.1605 7.936 37.4805 8.248 37.6885 8.624V7.424H38.7925V14.144C38.7925 14.744 38.6645 15.276 38.4085 15.74C38.1525 16.212 37.7845 16.58 37.3045 16.844C36.8325 17.108 36.2805 17.24 35.6485 17.24C34.7845 17.24 34.0645 17.036 33.4885 16.628C32.9125 16.22 32.5725 15.664 32.4685 14.96H33.5485C33.6685 15.36 33.9165 15.68 34.2925 15.92C34.6685 16.168 35.1205 16.292 35.6485 16.292C36.2485 16.292 36.7365 16.104 37.1125 15.728C37.4965 15.352 37.6885 14.824 37.6885 14.144V12.764C37.4725 13.148 37.1525 13.468 36.7285 13.724C36.3045 13.98 35.8085 14.108 35.2405 14.108C34.6565 14.108 34.1245 13.964 33.6445 13.676C33.1725 13.388 32.8005 12.984 32.5285 12.464C32.2565 11.944 32.1205 11.352 32.1205 10.688C32.1205 10.016 32.2565 9.428 32.5285 8.924C32.8005 8.412 33.1725 8.016 33.6445 7.736C34.1245 7.456 34.6565 7.316 35.2405 7.316ZM37.6885 10.7C37.6885 10.204 37.5885 9.772 37.3885 9.404C37.1885 9.036 36.9165 8.756 36.5725 8.564C36.2365 8.364 35.8645 8.264 35.4565 8.264C35.0485 8.264 34.6765 8.36 34.3405 8.552C34.0045 8.744 33.7365 9.024 33.5365 9.392C33.3365 9.76 33.2365 10.192 33.2365 10.688C33.2365 11.192 33.3365 11.632 33.5365 12.008C33.7365 12.376 34.0045 12.66 34.3405 12.86C34.6765 13.052 35.0485 13.148 35.4565 13.148C35.8645 13.148 36.2365 13.052 36.5725 12.86C36.9165 12.66 37.1885 12.376 37.3885 12.008C37.5885 11.632 37.6885 11.196 37.6885 10.7ZM41.9699 8.492C42.1619 8.116 42.4339 7.824 42.7859 7.616C43.1459 7.408 43.5819 7.304 44.0939 7.304V8.432H43.8059C42.5819 8.432 41.9699 9.096 41.9699 10.424V14H40.8779V7.424H41.9699V8.492ZM45.1865 10.688C45.1865 10.016 45.3225 9.428 45.5945 8.924C45.8665 8.412 46.2385 8.016 46.7105 7.736C47.1905 7.456 47.7225 7.316 48.3065 7.316C48.8825 7.316 49.3825 7.44 49.8065 7.688C50.2305 7.936 50.5465 8.248 50.7545 8.624V7.424H51.8585V14H50.7545V12.776C50.5385 13.16 50.2145 13.48 49.7825 13.736C49.3585 13.984 48.8625 14.108 48.2945 14.108C47.7105 14.108 47.1825 13.964 46.7105 13.676C46.2385 13.388 45.8665 12.984 45.5945 12.464C45.3225 11.944 45.1865 11.352 45.1865 10.688ZM50.7545 10.7C50.7545 10.204 50.6545 9.772 50.4545 9.404C50.2545 9.036 49.9825 8.756 49.6385 8.564C49.3025 8.364 48.9305 8.264 48.5225 8.264C48.1145 8.264 47.7425 8.36 47.4065 8.552C47.0705 8.744 46.8025 9.024 46.6025 9.392C46.4025 9.76 46.3025 10.192 46.3025 10.688C46.3025 11.192 46.4025 11.632 46.6025 12.008C46.8025 12.376 47.0705 12.66 47.4065 12.86C47.7425 13.052 48.1145 13.148 48.5225 13.148C48.9305 13.148 49.3025 13.052 49.6385 12.86C49.9825 12.66 50.2545 12.376 50.4545 12.008C50.6545 11.632 50.7545 11.196 50.7545 10.7ZM55.0358 8.636C55.2518 8.26 55.5718 7.948 55.9958 7.7C56.4278 7.444 56.9278 7.316 57.4958 7.316C58.0798 7.316 58.6078 7.456 59.0798 7.736C59.5598 8.016 59.9358 8.412 60.2078 8.924C60.4798 9.428 60.6158 10.016 60.6158 10.688C60.6158 11.352 60.4798 11.944 60.2078 12.464C59.9358 12.984 59.5598 13.388 59.0798 13.676C58.6078 13.964 58.0798 14.108 57.4958 14.108C56.9358 14.108 56.4398 13.984 56.0078 13.736C55.5838 13.48 55.2598 13.164 55.0358 12.788V17.12H53.9438V7.424H55.0358V8.636ZM59.4998 10.688C59.4998 10.192 59.3998 9.76 59.1998 9.392C58.9998 9.024 58.7278 8.744 58.3838 8.552C58.0478 8.36 57.6758 8.264 57.2678 8.264C56.8678 8.264 56.4958 8.364 56.1518 8.564C55.8158 8.756 55.5438 9.04 55.3358 9.416C55.1358 9.784 55.0358 10.212 55.0358 10.7C55.0358 11.196 55.1358 11.632 55.3358 12.008C55.5438 12.376 55.8158 12.66 56.1518 12.86C56.4958 13.052 56.8678 13.148 57.2678 13.148C57.6758 13.148 58.0478 13.052 58.3838 12.86C58.7278 12.66 58.9998 12.376 59.1998 12.008C59.3998 11.632 59.4998 11.192 59.4998 10.688ZM65.5572 7.304C66.0532 7.304 66.5012 7.412 66.9012 7.628C67.3012 7.836 67.6132 8.152 67.8372 8.576C68.0692 9 68.1852 9.516 68.1852 10.124V14H67.1052V10.28C67.1052 9.624 66.9412 9.124 66.6132 8.78C66.2852 8.428 65.8372 8.252 65.2692 8.252C64.6932 8.252 64.2332 8.432 63.8892 8.792C63.5532 9.152 63.3852 9.676 63.3852 10.364V14H62.2932V5.12H63.3852V8.36C63.6012 8.024 63.8972 7.764 64.2732 7.58C64.6572 7.396 65.0852 7.304 65.5572 7.304Z" fill="#616161"/></svg>
                    </span>
                    <span style="cursor: pointer; display: flex;">
                        <svg width="19" height="5" viewBox="0 0 19 5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2.5" cy="2.5" r="2.5" fill="#616161"/><circle cx="9.5" cy="2.5" r="2.5" fill="#616161"/><circle cx="16.5" cy="2.5" r="2.5" fill="#616161"/></svg>
                    </span>
                </div>
            </div>

            <textarea style="width: 100%; height: 150px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; padding: 10px; resize: none; outline: none;"></textarea>
        </div>
  `;
  }

  if (
    asset.asset_content_type === "article" &&
    asset.asset_type === "display_asset"
  ) {
    content += `
    <div class="4sa-container" style="margin-top: 5px;">
        <div class="collapsible-header" style="background: #F2F2F2; margin-top: 45px; padding: 10px 15px; display: flex; align-items: center; gap: 10px; border-top: 1px solid #D1D1D1; border-bottom: 1px solid #ddd; cursor: pointer;">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1003 9.6001L7.98895 3.66642L1.87761 9.6001L0 7.77334L7.98895 9.72748e-05L15.9779 7.77334L14.1003 9.6001Z" fill="black"/>
<path d="M15.9062 7.77393L7.98828 0.0698242L0.0712891 7.77393L1.87695 9.53076L7.9541 3.63037L7.98926 3.59717L8.02344 3.63037L14.0996 9.53076L15.9062 7.77393Z" stroke="black" stroke-opacity="0.4" stroke-width="0.1"/>
</svg>

            <span style="font-weight: 600;">Introduction</span>
        </div>
        <div style="padding: 15px 25px; font-size: 14px; margin-bottom: 15px; background: #fff;">
            <p>The 4SA Method , How to bring a idea into progress ?</p>
            <p style="text-align: right; color: #666; font-size: 12px; margin-top: 10px; cursor: pointer;">See More</p>
        </div>

        <div class="collapsible-header" style="background: #F2F2F2; padding: 10px 15px; display: flex; align-items: center; gap: 10px; border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; cursor: pointer;">
             <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1003 9.6001L7.98895 3.66642L1.87761 9.6001L0 7.77334L7.98895 9.72748e-05L15.9779 7.77334L14.1003 9.6001Z" fill="black"/>
<path d="M15.9062 7.77393L7.98828 0.0698242L0.0712891 7.77393L1.87695 9.53076L7.9541 3.63037L7.98926 3.59717L8.02344 3.63037L14.0996 9.53076L15.9062 7.77393Z" stroke="black" stroke-opacity="0.4" stroke-width="0.1"/>
</svg>

            <span style="font-weight: 600;">Thread A</span>
        </div>
        <div style="padding: 15px 25px; font-size: 14px; background: #fff;">
            <p>How are you going to develop your stratergy ? Which method are you going to use to develop a stratergy ? What if the project is lengthy?</p>
            <p style="text-align: right; color: #666; font-size: 12px; margin-top: 10px; cursor: pointer;">See More</p>
        </div>
        
        <div style="margin-left: 35px; margin-top: 20px; margin-right: 20px;">
             <div class="collapsible-header" style="background: #FCFCFC; padding: 10px; border: 1px solid #ddd;">
                <span style="font-weight: 600;">Example 1</span>
             </div>
             <div style="padding: 15px; font-size: 14px; border: 1px solid #ddd; border-top: none; background: #fff;">
                <p>You have a concept , How will you put into progress?</p>
             </div>
        </div>
    </div>
  `;
  }

  content += `</div>`;
  card.innerHTML = content;
  container.appendChild(card);
}
const sidebar = document.getElementById("journeyBoard");
const toggleBtn = document.getElementById("toggleJourney");
const toggleIcon = document.getElementById("toggleIcon");

if (sidebar.classList.contains("collapsed")) {
  toggleIcon.src = "rightarrow.png";
} else {
  toggleIcon.src = "fe6e4937e192363bc8a2c9c39ade7f24e1906488.png";
}

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");

  if (sidebar.classList.contains("collapsed")) {
    toggleIcon.src = "rightarrow.png";
  } else {
    toggleIcon.src = "fe6e4937e192363bc8a2c9c39ade7f24e1906488.png";
  }
});
