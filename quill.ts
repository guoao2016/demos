import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzModalSubject, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';

import { HttpService } from '../../service/http.service';
import { UtilsService } from '../../service/utils.service';
import { GlobalDataService } from '../../service/global-data.service';

const XSS = require('xss');
@Component({
  selector: 'create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.less']
})
export class CreateArticleComponent implements OnInit {
  validateForm: FormGroup;
  content = '';
  titleIcon = '';
  titleImgLoading = false;
  article_id;
  process_id;
  task_id;
  showReson = false;
  rejectReason = '';
  saveDisabled = true;
  isSaving = false;
  isSubmit = false;
  articleLength = 0;
  isVisible = false; // 文章预览
  showModal = false; // 提交操作模态框
  editor;
  quillConfig;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private nzModalService: NzModalService,
    private _http: HttpService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _globalData: GlobalDataService
  ) {

    this.quillConfig = {
      toolbar: [
        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'size': ['small', 'large', 'huge'] }],  // custom dropdown
        ['bold', 'italic', 'underline'],        // toggled buttons
        [{ 'color': [] }, { 'background': [] }],          // 字体颜色，背景颜色
        // ['code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': ['justify', '', 'center', 'right'] }],
        ['image']                         // link and image, video
      ]
    };
  }



  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required, Validators.maxLength(27)]],
      subtitle: [null, [Validators.required, Validators.maxLength(70)]],
      author: [null, [Validators.required, Validators.maxLength(20)]],
    });
    this.article_id = this.activatedRoute.snapshot.params['article_id'];
    if (this.article_id === 'new') {
      this.article_id = null;
      this.saveDisabled = true;
      this.validateForm.valueChanges.subscribe(data => {
        this.saveDisabled = false;
      });
    } else {
      this.getArticleData(this.article_id);
    }
  }

  messageReminding(msg: string, success?: boolean) {
    if (success) {
      const modal = this.nzModalService.success({ title: msg });
      setTimeout(() => modal.destroy(), 1600);
    } else {
      this.nzModalService.error({ title: msg });
    }
  }

  contentTrim(str, is_global) {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (is_global.toLowerCase() === 'g') {
      result = result.replace(/\s/g, '');
    }
    return result;
  }

  // 统计字数
  checkContentChange(contentText, extraText) {
    const textLength = this.contentTrim(contentText.elementRef.nativeElement.innerText, 'g').length;
    this.articleLength = textLength - this.contentTrim(extraText.innerText, 'g').length;
    this.saveDisabled = false;
  }
  // 编辑先获取文章
  getArticleData(id: Number) {
    this._http.get(`/group_manager/cms/get_article_by_id?article_id=${id}`).then(
      data => {
        this.process_id = data['process_id'];
        this.task_id = data['task_id'];
        this.content = data['content'];
        this.titleIcon = data['cover_url'];
        this.validateForm = this.fb.group({
          title: [data['title'], [Validators.required, Validators.maxLength(27)]],
          subtitle: [data['subtitle'], [Validators.required, Validators.maxLength(70)]],
          author: [data['author'], [Validators.required, Validators.maxLength(20)]],
        });
        // 监听表单值变化
        this.validateForm.valueChanges.subscribe(() => {
          this.saveDisabled = false;
        });
        setTimeout(() => { this.saveDisabled = true; }, 100);
        this.rejectReason = data['marking_reject'];
        if (String(data['status']) === '6' && this.rejectReason) {
          this.showReson = true;
        }
      }
    );
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  fileReader(files, type?) {
    const that = this;
    // if (files.length) {
    // }
    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (/image+/.test(file.type)) {
      reader.onload = function () {
        if (type === 'title') {
          // 标题图
          if (parseInt(file.size, 10) / 1024 > 500) {
            that.messageReminding('图片大小不超过500kb');
            return;
          }
          // 1. 主题icon：48*48 像素  32-128  0.8-1.2
          // 2. 主题封面图、文章封面图、文章正文图：长边像素范围：500-2500 .jpg格式，各自大小不超过2MB
          that.titleIcon = '';
          that.uploadTitleImg(file);
        }
      };
    }
  }

  uploadTitleImg(file) {
    this.titleImgLoading = true;
    this._http.uploadAg('./cms/upload/save_image', file)
      .then(data => {
        this.messageReminding('上传成功', true);
        this.titleImgLoading = false;
        this.titleIcon = data;
        this.saveDisabled = false;
      });
  }

  escapeStringHTML(str) {
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    return str;
  }

  escapeHTMLString(str) {
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    return str;
  }

  transContent(range) {
    const options = {
      whiteList: {
        div: ['class'],
        p: ['class'],
        span: ['style'],
        img: ['class', 'src', 'style', 'alt', 'title'],
        strong: ['class'],
        em: ['class'],
        u: ['class'],
        ol: ['class'],
        ul: ['class'],
        li: ['class']
      },
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script'],
    };


    const _content = XSS(this.content, {
      onTagAttr: function (tag, name, value, isWhiteAttr) {
        if (tag === 'img' && name === 'src') {
          if (_.startsWith(_.lowerCase(value), 'http') || _.startsWith(_.lowerCase(value), 'https')) {
            return 'src = "undefined" alt = "不支持外链图片"';
          }
        }
        if (tag === 'a' && name === 'href'){
          if (_.startsWith(_.lowerCase(value), 'http') || _.startsWith(_.lowerCase(value), 'https')) {
            return '';
          }
        }

      }
    });
    // this._content = XSS(this.escapeStringHTML(_content), options);
    this.content = _.cloneDeep(_content);
    setTimeout(() => {
       this.editor.setSelection(range.index, range.length);
    }, 10);

  }

  contentChange() {
    const _this = this;
    const range = _this.editor.getSelection(true);

    XSS(this.content, {
      onTagAttr: function (tag, name, value, isWhiteAttr) {
        if (tag === 'img' && name === 'src') {
          if (_.startsWith(_.lowerCase(value), 'http') || _.startsWith(_.lowerCase(value), 'https')) {
            _this.transContent(range);
          }
        }

        if (tag === 'a' && name === 'href') {
          if (_.startsWith(_.lowerCase(value), 'http') || _.startsWith(_.lowerCase(value), 'https')) {
            _this.transContent(range);
          }
        }
      }
    });
  }

  viewContent() {
    this.isVisible = true;
  }

  checkSubmitContent(submit: boolean) {
    let validate = true;
    XSS(this.content, {
      onTagAttr: function (tag, name, value, isWhiteAttr) {
        if (tag === 'img' && name === 'alt') {
          if (value === '不支持外链图片') {
            validate = false;
          }
        }
      }
    });

    if (validate) {
      this.saveData(submit);
    } else {
      this.messageReminding('不支持外链图片');
    }
  }

  saveData(submit: boolean) {

    this.showModal = true;
    let postBody = Object.assign(
      {},
      this.validateForm.value,
      { 'content': this.escapeStringHTML(this.content), 'cover_url': this.titleIcon });
    if (this.article_id) {
      postBody = Object.assign({}, postBody, { 'article_id': this.article_id, 'process_id': this.process_id, 'task_id': this.task_id });
    }
    if (submit) {
      // 提交文章
      this.isSubmit = true;
      this._http.post('../group_manager/cms/submit_article', postBody).then(
        data => {
          if (data) {
            this.isSubmit = false;
            this.showModal = false;
            this.messageReminding('文章上传成功', true);
            setTimeout(() => { this._router.navigate(['group/article-list']); }, 1800);

          } else {
            this.isSubmit = false;
            this.messageReminding('文章上传失败');
          }
        }, error => {
          this.isSubmit = false;
          this.showModal = false;
          // this.messageReminding('文章上传失败');
        }

      );
    } else {
      // 暂存文章
      this.isSaving = true;
      this._http.post('../group_manager/cms/save_article', postBody).then(
        data => {
          this.showModal = false;
          if (data) {
            this.article_id = data['article_id'];
            this.process_id = data['process_id'];
            this.task_id = data['task_id'];
            this.isSaving = false;

            this.saveDisabled = true;
            this.messageReminding('文章暂存成功', true);
          } else {
            this.isSaving = false;
            this.messageReminding('文章暂存失败');
          }
        }, error => {
          // this.messageReminding('文章暂存失败');
          this.showModal = false;
          this.isSaving = false;
        }
      );
    }
  }

  discard() {
    this.nzModalService.confirm({
      title: '是否确认废弃当前文章并终结审批流程',
      zIndex: 1001,
      onOk: () => {
        const postBody = {
          'article_id': this.article_id,
          'process_id': this.process_id,
          'task_id': this.task_id
        };
        this._http.post('./cms/discard', postBody).then(
          data => {
            this._router.navigate(['group/article-list']);
          }
        );
      }
    });
  }

  goBack() {
    this.location.back();
  }


  /**
   * 富文本上传图片
   */

  EditorCreated(quill) {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.imageHandler.bind(this));
    this.editor = quill;
  }

  imageHandler() {
    const that = this;
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {
      const file = Imageinput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (file.size / 1024 > 800) {
          that.messageReminding('图片大小不超过800kb');
          return;
        }

        const data: FormData = new FormData();
        data.append('file', file, file.name);
        if (Imageinput.files != null && Imageinput.files[0] != null) {
          that._http.uploadAg('./cms/upload/save_image', file)
            .then(saved => {
              that.messageReminding('上传成功', true);
              const range = that.editor.getSelection(true);
              const index = range.index + range.length;
              that.editor.insertEmbed(range.index, 'image', saved);
            });
        }
      };

    });
    Imageinput.click();
  }


  hasResource(resource) {
    return _.indexOf(this._globalData.userResources, resource) > -1;
  }

}
