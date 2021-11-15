const reverseEngineerFiles = (files) => {

    let processedFiles  =[];

    const engineer = async (files) => {
      files.forEach((file) => {
        if (file.parent.id === 'root'){
         processedFiles.push(file.file);
        }
      });

    };

    engineer(files)
    return processedFiles;
  }

export {reverseEngineerFiles}