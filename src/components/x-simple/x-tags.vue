
<template>
  <div ref="scrollCon"
       @DOMMouseScroll="handlescroll"
       @mousewheel="handlescroll"
       class="tags-outer-scroll-con">
    <div class="close-all-tag-con">
      <slot name="btn"></slot>
    </div>
    <div ref="scrollBody"
         class="tags-inner-scroll-body"
         :style="{left: tagBodyLeft + 'px'}">
      <transition-group name="taglist-moving-animation">
        <Tag type="dot"
             v-for="(item) in items"
             ref="tagsPageOpened"
             :key="item.name"
             :name="item.name"
             @on-close="closePage"
             @click.native="linkTo(item)"
             :closable="item.name=='home_index'?false:true"
             :color="getColor(item)">{{ item.title }}</Tag>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "x-tags",
  props: {
    items: {
      type: Array
    }
  },
  data () {
    return {

      currentPageName: 'home_index',
      tagBodyLeft: 0,
      refsTag: [],

    };
  },

  methods: {
    getColor (item) {
      return item.children ? (item.children[0].name == this.currentPageName ? 'primary' : 'default') : (item.name == this.currentPageName ? 'primary' : 'default')

    },

    closePage (event, name) {
            this.$emit('close', name)
      let pageOpenedList = this.items;
      let lastPageObj = pageOpenedList[0];
      if (this.currentPageName == name) {
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name == name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            break;
          }
        }
        this.linkTo(lastPageObj);
      } else {
        let tagWidth = event.target.parentNode.offsetWidth;
        this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
      }


    },
    linkTo (item) {
      this.currentPageName = item.name
      $emit('link', item)
    },
    handlescroll (e) {
      var type = e.type;
      let delta = 0;
      if (type == "DOMMouseScroll" || type == "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      let left = 0;
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
              this.$refs.scrollBody.offsetWidth -
              100
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
      this.tagBodyLeft = left;
    },
    handleTagsOption (type) {
      if (type == "clearAll") {
        this.$store.commit("clearAllTags");
        this.$router.push({
          name: "home_index"
        });
      } else {
        this.$store.commit("clearOtherTags", this);
      }
      this.tagBodyLeft = 0;
    },
    moveToView (tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
        -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollCon.offsetWidth -
          100 -
          tag.offsetWidth -
          tag.offsetLeft -
          20
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
          20
        );
      }
    }
  },
  mounted () {
    this.refsTag = this.$refs.tagsPageOpened;
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name == item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug

  }

};
</script>
<style lang="less">
.tags-con {
  height: 40px;
  z-index: -1;
  overflow: hidden;
  background: #f0f0f0;
}
.tags-outer-scroll-con {
  position: relative;
  box-sizing: border-box;
  padding-right: 120px;
  width: 100%;
  height: 100%;

  .tags-inner-scroll-body {
    position: absolute;
    padding: 2px 10px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
    top: 2px;
  }

  .close-all-tag-con {
    position: absolute;
    right: 0px;
    top: 0;
    box-sizing: border-box;
    padding-top: 8px;
    text-align: center;
    width: 120px;
    height: 100%;

    z-index: 10;
  }
}
</style>
