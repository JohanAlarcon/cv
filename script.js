// Función para descargar el PDF
document.getElementById('download-btn').addEventListener('click', () => {
  console.log('Descargando PDF...');
  try {
    const element = document.getElementById('cv'); // Selecciona el contenedor de la hoja de vida
    const options = {
      margin: [0.2, 0.5, 0.5, 0.5], // Reduce el margen superior a 0.2
      filename: 'Hoja_de_Vida_Johan_Dario_Alarcon.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generar el PDF y eliminar páginas en blanco
    html2pdf().set(options).from(element).toPdf().get('pdf').then((pdf) => {
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = totalPages; i > 0; i--) {
        const pageContent = pdf.internal.pages[i];
        if (!pageContent || pageContent.length === 0) {
          pdf.deletePage(i);
        }
      }
    }).save();
  } catch (e) {
    console.log(e);
  }
});