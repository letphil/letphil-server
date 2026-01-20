function updateFile(filePath, insertAfter, contentToInsert) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = fileContent.replace(
    insertAfter,
    `${insertAfter}\n${contentToInsert}`,
  );
  fs.writeFileSync(filePath, updatedContent);
}

module.exports = updateFile;
