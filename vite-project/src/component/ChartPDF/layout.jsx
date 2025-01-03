import { DownloadButton } from './chartpdf.jsx';
import ExportPDF from './rechartPng.jsx';

const DownloadButtonPdf = () => (
  <div className='bg-red-400'>
    <DownloadButton />
    <ExportPDF/>
  </div>
);

export default DownloadButtonPdf;