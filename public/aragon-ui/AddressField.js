'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./slicedToArray-0711941d.js');
require('./unsupportedIterableToArray-68db1d3b.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./_commonjsHelpers-72d386ba.js');
var index = require('./index-b0606964.js');
require('./defineProperty-0921a47c.js');
require('./toConsumableArray-d8a4a2c3.js');
var _styled = require('styled-components');
var _styled__default = _interopDefault(_styled);
require('./getPrototypeOf-2a661a20.js');
require('./color.js');
require('./components.js');
require('./contains-component.js');
require('./css.js');
require('./dayjs.min-e07657bf.js');
require('./date.js');
require('./miscellaneous.js');
require('./environment.js');
require('./font.js');
require('./math-f4029164.js');
require('./characters.js');
require('./format.js');
require('./keycodes.js');
require('./url.js');
require('./web3.js');
var constants = require('./constants.js');
require('./breakpoints.js');
require('./springs.js');
require('./text-styles.js');
require('./theme-dark.js');
require('./theme-light.js');
require('./Theme.js');
require('./extends-40571110.js');
var objectWithoutProperties = require('./objectWithoutProperties-35db8ab0.js');
require('./index-ecc57c9f.js');
require('./isObject-ec755c87.js');
require('./Viewport-15101437.js');
require('./Layout.js');
require('./FocusVisible.js');
require('./ButtonBase.js');
require('./IconPropTypes-56de5759.js');
require('./IconAddUser.js');
require('./IconAlert.js');
require('./IconAlignCenter.js');
require('./IconAlignJustify.js');
require('./IconAlignLeft.js');
require('./IconAlignRight.js');
require('./IconAragon.js');
require('./IconArrowDown.js');
require('./IconArrowLeft.js');
require('./IconArrowRight.js');
require('./IconArrowUp.js');
require('./IconAtSign.js');
require('./IconBlock.js');
require('./IconBookmark.js');
require('./IconCalendar.js');
require('./IconCanvas.js');
require('./IconCaution.js');
require('./IconCenter.js');
require('./IconChart.js');
require('./IconChat.js');
require('./IconCheck.js');
require('./IconChip.js');
require('./IconCircleCheck.js');
require('./IconCircleMinus.js');
require('./IconCirclePlus.js');
require('./IconClock.js');
require('./IconCloudDownload.js');
require('./IconCloudUpload.js');
require('./IconCoin.js');
require('./IconConfiguration.js');
require('./IconConnect.js');
require('./IconConnection.js');
require('./IconConsole.js');
require('./IconCopy.js');
require('./IconCross.js');
require('./IconDashedSquare.js');
require('./IconDown.js');
require('./IconDownload.js');
require('./IconEdit.js');
require('./IconEllipsis.js');
require('./IconEnter.js');
require('./IconEthereum.js');
require('./IconExternal.js');
require('./IconFile.js');
require('./IconFilter.js');
require('./IconFlag.js');
require('./IconFolder.js');
require('./IconGraph2.js');
require('./IconGraph.js');
require('./IconGrid.js');
require('./IconGroup.js');
require('./IconHash.js');
require('./IconHeart.js');
require('./IconHide.js');
require('./IconHome.js');
require('./IconImage.js');
require('./IconInfo.js');
require('./IconLabel.js');
require('./IconLayers.js');
require('./IconLeft.js');
require('./IconLink.js');
require('./IconLocation.js');
require('./IconLock.js');
require('./IconMail.js');
require('./IconMaximize.js');
require('./IconMenu.js');
require('./IconMinimize.js');
require('./IconMinus.js');
require('./IconMove.js');
require('./IconNoPicture.js');
require('./IconPicture.js');
require('./IconPlus.js');
require('./IconPower.js');
require('./IconPrint.js');
require('./IconProhibited.js');
require('./IconQuestion.js');
require('./IconRefresh.js');
require('./IconRemoveUser.js');
require('./IconRight.js');
require('./IconRotateLeft.js');
require('./IconRotateRight.js');
require('./IconSearch.js');
require('./IconSettings.js');
require('./IconShare.js');
require('./IconSquareMinus.js');
require('./IconSquarePlus.js');
require('./IconSquare.js');
require('./IconStarFilled.js');
require('./IconStar.js');
require('./IconSwap.js');
require('./IconTarget.js');
require('./IconToken.js');
require('./IconTrash.js');
require('./IconUnlock.js');
require('./IconUp.js');
require('./IconUpload.js');
require('./IconUser.js');
require('./IconView.js');
require('./IconVote.js');
require('./IconWallet.js');
require('./IconWarning.js');
require('./IconWorld.js');
require('./IconWrite.js');
require('./IconZoomIn.js');
require('./IconZoomOut.js');
require('./objectWithoutPropertiesLoose-1af20ad0.js');
require('react-dom');
require('./web-d0294535.js');
require('./Button.js');
require('./ButtonIcon.js');
require('./TextInput.js');
require('./ToastHub.js');
require('./index-0db71dc1.js');
require('./RootPortal.js');
var TextCopy = require('./TextCopy.js');
require('./taggedTemplateLiteral-227ed122.js');
require('./_react_commonjs-external-bf8fc71c.js');
var EthIdenticon = require('./EthIdenticon.js');

var HEIGHT = 5 * constants.GU;
var IDENTICON_SIZE = 6 * constants.GU;

var _StyledEthIdenticon = _styled__default(EthIdenticon.default).withConfig({
  displayName: "AddressField___StyledEthIdenticon",
  componentId: "m75adw-0"
})(["transform:scale(", ");transform-origin:50% 50%;"], function (p) {
  return p._css;
});

var AddressField = React__default.forwardRef(function AddressField(_ref, ref) {
  var address = _ref.address,
      autofocus = _ref.autofocus,
      icon = _ref.icon,
      onCopy = _ref.onCopy,
      props = objectWithoutProperties._objectWithoutProperties(_ref, ["address", "autofocus", "icon", "onCopy"]);

  return /*#__PURE__*/React__default.createElement(TextCopy.default, {
    ref: ref,
    adornment: icon || /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(_StyledEthIdenticon, {
      address: address,
      onCopy: onCopy,
      scale: 2,
      _css: (HEIGHT - 2) / IDENTICON_SIZE
    })),
    autofocus: autofocus,
    value: address
  });
});
AddressField.propTypes = {
  address: index.PropTypes.string.isRequired,
  autofocus: index.PropTypes.bool,
  icon: index.PropTypes.node,
  onCopy: index.PropTypes.func
};
AddressField.defaultProps = {
  autofocus: true
};

exports.default = AddressField;
//# sourceMappingURL=AddressField.js.map
