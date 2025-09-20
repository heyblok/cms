import { setPluginConfig } from '@_sh/strapi-plugin-ckeditor';

export default {
  config: {
    // Add any other admin configuration here
  },
  register(app) {
    // Configure CKEditor plugin before bootstrap
    setPluginConfig({
      presets: [
        {
          name: 'Enhanced HTML Editor',
          description: 'Rich text editor with full formatting options including bullet points',
          editorConfig: {
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'link',
                'blockQuote',
                'insertTable',
                '|',
                'undo',
                'redo',
                '|',
                'code',
                'codeBlock',
                '|',
                'sourceEditing'
              ]
            },
            heading: {
              options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
              ]
            },
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
            },
            list: {
              properties: {
                styles: true,
                startIndex: true,
                reversed: true
              }
            }
          }
        }
      ]
    });
  },
  bootstrap(app) {
    // This runs after all plugins have been initialized
    console.log('Admin panel bootstrapped with CKEditor configuration');
  },
};
