import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Inspector from 'vite-plugin-vue-inspector';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
const tailPkgs = ['components'];

const entry = tailPkgs.map(item => resolve(__dirname, `./packages/${item}/src/index.ts`));
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        Inspector(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'Icon'
                })
            ]
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                IconsResolver({
                    prefix: 'i',
                    enabledCollections: ['ep']
                })
            ]
        }),
        Icons({
            autoInstall: true
        })
    ],
    build: {
        target: 'modules',
        outDir: 'es',
        minify: false,
        // cssCodeSplit: true,
        // lib: {
        //     // Could also be a dictionary or array of multiple entry points
        //     // entry: entry,
        //     // name: 'Pro-Element-Plus',
        //     // // the proper extensions will be added
        //     // fileName: 'pro-layout',
        //     formats: ['es', 'cjs']
        // },

        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            input: entry,
            external: ['vue'],
            preserveEntrySignatures: 'allow-extension',
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'es',
                    preserveModulesRoot: 'src'
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    dir: 'lib',
                    preserveModulesRoot: 'src'
                }
            ]
        }
    }
});
