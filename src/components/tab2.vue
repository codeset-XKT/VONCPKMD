<template>
  <div>
    <div ref="earthContainer" style="position:fixed;width: 100%; height: 100%;top:0;background: var(--bg-darkColor);"></div>
  </div>
</template>

<script>
    // 1 创建Earth的vue组件
    var Tab2 = {
        data() {
            return {
                message: "页面加载于 " + new Date().toLocaleString(),
                _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
                _bgImagery: undefined
            };
        },
        beforeCreate() {
            this.$Loading.start();
        },
        // 1.1 资源创建
        mounted() {

            setTimeout(() => {
                // 1.1.1 创建地球
                var earth = new XE.Earth(this.$refs.earthContainer, {
                    orderIndependentTranslucency: false,
                    contextOptions: {
                        webgl: {
                            alpha: true,
                        }
                    },
                });
                const viewer = earth.czm.viewer;
                viewer.scene.skyBox.show = false;
                viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
                // 1.1.2 添加默认地球影像
                earth.sceneTree.root = {
                    children: [{
                        czmObject: {
                            name: "默认离线影像",
                            xbsjType: "Imagery",
                            xbsjImageryProvider: {
                                createTileMapServiceImageryProvider: {
                                    url: XE.HTML.cesiumDir + "Assets/Textures/NaturalEarthII",
                                    fileExtension: "jpg",
                                },
                                type: "createTileMapServiceImageryProvider"
                            }
                        }
                    }]
                };
            }, 1000);
            this.$Loading.finish();

        },
        // 1.2 资源销毁
        beforeDestroy() {
            // vue程序销毁时，需要清理相关资源
            this._earth = this._earth && this._earth.destroy();
        }
    };

    export default Tab2;
</script>