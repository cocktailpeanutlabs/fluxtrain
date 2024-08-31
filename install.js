module.exports = {
  run: [
    // Edit this step to customize the git repository to use
    {
      method: "shell.run",
      params: {
        message: [
          //"git clone --recursive https://github.com/bmaltais/kohya_ss -b sd3-flux.1 --single-branch app",
          "git clone --recursive https://github.com/peanutcocktail/kohya_ss -b sd3-flux.1 --single-branch app",
        ]
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "dataset/dataset.toml",
        dest: "app/sd-scripts/dataset.toml"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "dataset/{{platform === 'win32' ? 'train.bat' : 'train.sh'}}",
        dest: "app/sd-scripts/{{platform === 'win32' ? 'train.bat' : 'train.sh'}}"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "dataset/images",
        dest: "app/dataset/images",
        options: {
          force: true
        }
      }
    },
//    // Delete this step if your project does not use torch
//    {
//      method: "script.start",
//      params: {
//        uri: "torch.js",
//        params: {
//          venv: "env",                // Edit this to customize the venv folder path
//          path: "app",                // Edit this to customize the path to start the shell from
//          // xformers: true   // uncomment this line if your project requires xformers
//        }
//      }
//    },
    // Edit this step with your custom install commands
    {
      method: "shell.run",
      params: {
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "{{platform === 'win32' ? 'setup.bat' : 'bash setup.sh'}}",
        ]
      }
    },
    {
      method: "fs.download",
      params: {
        uri: [
          "https://huggingface.co/cocktailpeanut/xulf-dev/resolve/main/flux1-dev.sft?download=true",
          "https://huggingface.co/cocktailpeanut/xulf-dev/resolve/main/ae.sft?download=true",
          "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/clip_l.safetensors?download=true",
          "https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/t5xxl_fp16.safetensors?download=true",
        ],
        dir: "app/models"
      }
    },
  ]
}
