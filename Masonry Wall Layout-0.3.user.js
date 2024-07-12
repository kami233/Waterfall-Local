// ==UserScript==
// @name         Masonry Wall Layout
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Display images in a masonry wall layout using Tampermonkey
// @author       You
// @match        *://*.8ezy.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        // Select all images on the page
        var images = document.querySelectorAll('.entry-content img[data-srcset]');

        if (images.length > 0) {
            // Create a container for masonry layout
            var masonryContainer = document.createElement('div');
            masonryContainer.classList.add('masonry-wall');
            masonryContainer.style.position = 'relative';
            masonryContainer.style.width = '100%';
            masonryContainer.style.height = 'auto'; // Ensure container height adjusts to content

            // Initialize columns array
            var columns = [];
            var columnCount = 6; // 6列布局
            for (var i = 0; i < columnCount; i++) {
                columns.push(0);
            }

            images.forEach(function(img, index) {
                // Create a div for each image
                var masonryItem = document.createElement('div');
                masonryItem.classList.add('masonry-item');
                masonryItem.style.position = 'absolute';
                masonryItem.style.width = 'calc(16.66% - 10px)'; // 六列布局，每列宽度计算

                // Create the image element
                var imageElement = document.createElement('img');
                imageElement.src = img.dataset.srcset.split(',')[0].trim().split(' ')[0]; // Get the first image source
                imageElement.style.width = '100%'; // Make sure image fits its container
                imageElement.style.display = 'block'; // Ensure image is displayed as block element

                // Append image to masonry item
                masonryItem.appendChild(imageElement);

                // Append masonry item to container
                masonryContainer.appendChild(masonryItem);

                // 等图片加载完成后，动态设置位置和高度
                imageElement.addEventListener('load', function() {
                    var aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
                    var desiredWidth = masonryContainer.clientWidth / columnCount - 10; // 减去间距
                    var desiredHeight = desiredWidth / aspectRatio;

                    // 找到最短的列
                    var minColumnIndex = columns.indexOf(Math.min(...columns));
                    var topPosition = columns[minColumnIndex];
                    var leftPosition = minColumnIndex * (desiredWidth + 10);

                    // 设置图片位置和尺寸
                    masonryItem.style.top = topPosition + 'px';
                    masonryItem.style.left = leftPosition + 'px';
                    masonryItem.style.height = desiredHeight + 'px';

                    // 更新列的高度
                    columns[minColumnIndex] += desiredHeight + 10; // 加上间距
                });

                // 添加点击事件处理程序显示和隐藏大图
                imageElement.addEventListener('click', function() {
                    // 创建背景淡化层
                    var overlay = document.createElement('div');
                    overlay.classList.add('overlay');
                    overlay.style.position = 'fixed';
                    overlay.style.top = '0';
                    overlay.style.left = '0';
                    overlay.style.width = '100%';
                    overlay.style.height = '100%';
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    overlay.style.display = 'flex';
                    overlay.style.justifyContent = 'center';
                    overlay.style.alignItems = 'center';
                    overlay.style.zIndex = '1000';

                    // 创建显示的大图
                    var largeImage = document.createElement('img');
                    largeImage.src = img.dataset.srcset.split(',')[0].trim().split(' ')[0];
                    largeImage.style.maxWidth = '90%';
                    largeImage.style.maxHeight = '90%';

                    // 点击背景淡化层关闭大图
                    overlay.addEventListener('click', function() {
                        overlay.remove();
                    });

                    // 将大图添加到背景淡化层中
                    overlay.appendChild(largeImage);
                    document.body.appendChild(overlay);
                });
            });

            // Replace original images with masonry container
            var siteContent = document.querySelector('.site');
            siteContent.innerHTML = ''; // 清空原始内容
            siteContent.appendChild(masonryContainer);

            // Ensure overflow is visible
            siteContent.style.overflow = 'visible';
        }
    });
})();

